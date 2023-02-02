import React, { FC } from 'react';

interface IUser {
  userName: string;
  onClick?: React.MouseEventHandler;
}

const User: FC<IUser> = ({userName, onClick}) => {
  return (
    <div onClick={onClick} className="w-[100%] min-h-[43px] cursor-pointer hover:bg-[#A3C5D8]">
      <div className="flex items-center gap-3 px-[25px] py-[5px]">
        <img className="max-w-[33px] w-[100%] h-[auto] rounded-[50%] overflow-hidden" src="/img/avatar-man.png" alt="avatar" />
        <span className="inline-block text-[12px]">{userName}</span>
      </div>
    </div>
  );
};

export default User;