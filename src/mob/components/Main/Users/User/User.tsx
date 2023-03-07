import React, { FC } from "react";

interface IUser {
  img: string;
  userName: string;
  onClick: React.MouseEventHandler;
}

const User: FC<IUser> = ({ img, userName, onClick }) => {
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
      </div>
    </div>
  );
};

export default User;
