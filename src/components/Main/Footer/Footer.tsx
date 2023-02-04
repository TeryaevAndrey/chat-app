import { useStore } from 'effector-react';
import React, { FC } from 'react';
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


  React.useEffect(() => {
    socket.onmessage = (msg) => {
      console.log(msg);
      if(userInfo.userId) {
        setMessage({
          message: JSON.parse(msg.data).message, 
          from: JSON.parse(msg.data).from
        });
      }
    }
  }, []);

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
      socket.send(JSON.stringify(sendValue));
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