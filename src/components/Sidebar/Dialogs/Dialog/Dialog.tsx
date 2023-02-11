import React, { FC } from "react";

interface IDialog {
  img: string;
  userName: string;
  lastMessage?: string;
  isNewMessage: boolean;
  isActive: boolean;
}

const Dialog: FC<IDialog> = ({ img, userName, lastMessage, isNewMessage, isActive }) => {
  return (
    <div className={`bg-[${isActive ? "rgba(96,169,246,0.15)" : "transparent"}] w-full min-h-[50px] flex justify-between items-center px-4 py-1 cursor-pointer hover:bg-[rgba(96,169,246,0.15)] relative`}>
      {
        isActive && <div className="block absolute left-0 w-[3px] h-full bg-[#60A9F6]"></div>
      }
      <div className="w-[45px] h-[45px] overflow-hidden">
        <img className="w-full h-full" src={img} alt={userName} />
      </div>
      <div className="mr-auto ml-2 flex flex-col">
        <p className="text-[16px] font-bold text-[#0D1C2E]">{userName}</p>
        {
          lastMessage && <span className="inline-block text-[14px] font-normal text-[#707C97]">{lastMessage}</span>
        }
      </div>
      {
        isNewMessage && <div className="block w-[10px] h-[10px] rounded-[50%] bg-[#60A9F6] mr-3"></div>
      }
    </div>
  );
};

export default Dialog;
