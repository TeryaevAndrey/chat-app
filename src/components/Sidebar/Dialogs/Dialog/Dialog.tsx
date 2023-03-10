import React, { FC } from "react";

interface IDialog {
  img: string;
  userName: string;
  lastMessage?: string | undefined;
  isNewMessage?: boolean | undefined;
  isActive?: boolean;
  isOnline?: boolean;

  onClick?: React.MouseEventHandler;
}

const Dialog: FC<IDialog> = ({
  img,
  userName,
  lastMessage,
  isNewMessage,
  isActive,
  isOnline,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-[${
        isActive ? "rgba(96,169,246,0.15)" : "transparent"
      }] w-full min-h-[50px] flex justify-between items-center px-4 py-1 cursor-pointer hover:bg-[rgba(96,169,246,0.15)] relative`}
    >
      {isActive && (
        <div className="block absolute left-0 w-[3px] h-full bg-[#60A9F6]"></div>
      )}
      <div className="relative">
        <div className="w-[45px] h-[45px] rounded-[50%] overflow-hidden">
          <img className="w-full h-full" src={img} alt={userName} />
        </div>
        {isOnline && (
          <div className="w-4 h-4 rounded-full absolute top-[6px] right-0 bg-green-500"></div>
        )}
      </div>
      <div className="mr-auto ml-2 flex flex-col">
        <p className="text-[16px] font-bold text-[#0D1C2E]">{userName}</p>
        {lastMessage && (
          <span className="inline-block text-[14px] font-normal text-[#707C97]">
            {lastMessage}
          </span>
        )}
      </div>
      {isNewMessage && (
        <div className="block w-[10px] h-[10px] rounded-[50%] bg-[#60A9F6] mr-3"></div>
      )}
    </div>
  );
};

export default Dialog;
