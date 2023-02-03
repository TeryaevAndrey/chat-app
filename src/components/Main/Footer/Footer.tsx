import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { $searchInfo } from '../../../store/search';
import { $userInfo } from '../../../store/userInfo';
import { IMessage } from '../../../types';

interface IFooter {
  messages: IMessage[];
  setMessages: Function;
}

const Footer: FC<IFooter> = ({messages, setMessages}) => {
  const socket = new WebSocket("ws://localhost:5000/api/message/new-message");
  const userInfo = useStore($userInfo);
  const [sendValue, setSendValue] = React.useState<string>("");
  const [message, setMessage] = React.useState<IMessage | undefined>(undefined);


  React.useEffect(() => {
    socket.onmessage = (msg) => {
      if(userInfo.userId) {
        setMessage({
          message: msg.data, 
          from: userInfo.userId
        });
      }
    }
  }, [socket]);

  React.useEffect(() => {
    if(message !== undefined) {
      setMessages((prev: any) => [...prev, message]);
    }
  }, [message]);

  console.log(messages);

  const onChangeSendValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendValue(e.target.value);
  }

  const formHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      socket.send(sendValue);
    } catch(err) {
      console.log(err);
    }
  }
  
  return (
    <div className="w-[100%] min-h-[53px] bg-[#A7C9DC] px-[35px] py-[20px]">
      <form className="flex items-center justify-between">
        <input className="w-[100%] text-[14px] text-[#000] placeholder:text-[14px] placeholder:text-[#000] bg-transparent mr-[30px]" type="text" placeholder="Написать сообщение..." onChange={onChangeSendValue} value={sendValue} />

        <button className="w-[32px] h-[32px]" onClick={formHandler}>
          <img className="w-[100%] h-[100%] object-cover" src="/img/send.svg" alt="send" />
        </button>
      </form>
    </div>
  );
};

export default Footer;