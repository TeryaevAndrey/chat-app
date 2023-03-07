import React, { FC } from "react";

interface IDialog {
  img: string;
  userName: string;
  lastMessage?: string | undefined;
  isNewMessage?: boolean | undefined;
  isActive?: boolean;

  onClick?: React.MouseEventHandler;
}

const Dialog: FC<IDialog> = ({
  img,
  userName,
  lastMessage,
  isNewMessage,
  isActive,
  onClick,
}) => {
  return (
    <div
      className="flex items-center gap-4 px-2 py-3 border-b border-[#ccc] cursor-pointer"
      onClick={onClick}
    >
      <div className="w-[45px] h-[45px] rounded-[50%] overflow-hidden">
        <img className="w-full h-full" src={img} alt={userName} />
      </div>
      <div className="flex flex-col">
        <p className="text-base font-medium">{userName}</p>
        {lastMessage && (
          <span className="text-sm font-light">{lastMessage}</span>
        )}
      </div>
    </div>
  );
};

export default Dialog;
