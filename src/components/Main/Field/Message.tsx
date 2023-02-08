import React, { FC } from 'react';

interface IMessage {
  avatarImg: string;
  message: any;
  isMyMessage: boolean;
}

const Message: FC<IMessage> = ({avatarImg, message, isMyMessage}) => {
  return (
    <div className="flex items-start"> 
      <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden">
        <img className="w-full h-full" src={avatarImg} alt="avatar" />
      </div>
      <div className={`px-3 py-3 ${isMyMessage ? "bg-[#60A9F6]" : "bg-[#779dc5]"} rounded-[12px] rounded-tl-[0] ml-3 mt-3 text-[#fff] font-normal`}>
        {message}
      </div>
    </div>
  );
};

export default Message;