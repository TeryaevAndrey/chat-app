import axios from 'axios';
import { useStore } from 'effector-react';
import React, { FC } from 'react';
import Cookies, { Cookie } from 'universal-cookie';
import { $dialogId } from '../../../store/dialogId';
import { $searchInfo } from '../../../store/search';
import { $userInfo } from '../../../store/userInfo';
import { IMessage } from '../../../types';

interface IFooter {
  messages: IMessage[];
  setMessages: Function;
}

const Footer: FC<IFooter> = ({messages, setMessages}) => {
  const userInfo = useStore($userInfo);
  const dialogId = useStore($dialogId);
  const [sendValue, setSendValue] = React.useState({
    message: "",
    from: userInfo.userId
  });
  const [message, setMessage] = React.useState<IMessage | undefined>(undefined);
  const socket = new WebSocket(`ws://localhost:5000/api/message/new-message/:${dialogId}`);

  console.log(socket);
  console.log(dialogId);

  React.useEffect(() => {
    setMessages([]);

    axios.get(`${process.env.REACT_APP_PROXY}/api/message/get-messages/${dialogId}`).then((res) => {
      res.data.messages.forEach((message: any) => {
        setMessages((prev: any) => [...prev, {message: message.message, from: message.sender}]);
      });
    });
  }, [dialogId]);


  React.useEffect(() => {
    const socket = new WebSocket(`ws://localhost:5000/api/message/new-message/:${dialogId}`);
    socket.onmessage = (msg) => {
      console.log(msg);
      if(userInfo.userId) {
        setMessage({
          message: JSON.parse(msg.data).message, 
          from: JSON.parse(msg.data).from
        });
      }
    }
  }, [dialogId]);

  React.useEffect(() => {
    if(message !== undefined) {
      setMessages((prev: any) => [...prev, message]);
    }
  }, [message]);

  const onChangeSendValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendValue( prev => ({...prev, message: e.target.value}));
  }

  const formHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const cookies: Cookie = new Cookies();
      socket.send(JSON.stringify(sendValue));

      axios.post(`${process.env.REACT_APP_PROXY}/api/message/new-message`, {
        messageText: sendValue.message,
        dialog: dialogId,
      }, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`
        }
      });

      setSendValue(prev => ({...prev, message: ""}));
    } catch(err) {
      console.log(err);
    }
  }
  
  return (
    <div className="w-[100%] min-h-[53px] bg-[#A7C9DC] px-[35px] py-[20px]">
      <form className="flex items-center justify-between">
        <input className="w-[100%] text-[14px] text-[#000] placeholder:text-[14px] placeholder:text-[#000] bg-transparent mr-[30px]" type="text" placeholder="Написать сообщение..." onChange={onChangeSendValue} value={sendValue.message} />

        <button className="w-[32px] h-[32px]" onClick={formHandler}>
          <img className="w-[100%] h-[100%] object-cover" src="/img/send.svg" alt="send" />
        </button>
      </form>
    </div>
  );
};

export default Footer;