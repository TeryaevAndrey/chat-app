import React, { FC } from "react";

interface IUser {
  src: string;
  name: string;
  isOnline: boolean;
}

const User: FC<IUser> = ({ src, name, isOnline }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-[45px] h-[45px] rounded-[50%] overflow-hidden">
        <img className="w-full h-full" src={src} alt={name} />
      </div>
      <div className="flex flex-col">
        <span className="inline-block text-[16px] font-bold">{name}</span>
        <span className="inline-block text-[14px] font-medium text-[#707C97]">
          {
            isOnline ? "Online" : "Offline"
          }
        </span>
      </div>
    </div>
  );
};

export default User;
