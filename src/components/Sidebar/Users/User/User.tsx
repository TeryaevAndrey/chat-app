import React, { FC } from "react";

interface IUser {
  img: string;
  userName: string;
}

const User: FC<IUser> = ({ img, userName }) => {
  return (
    <div
      className={`bg-["transparent"] w-full min-h-[50px] flex justify-between items-center px-4 py-1 cursor-pointer hover:bg-[rgba(96,169,246,0.15)] relative`}
    >
      <div className="w-[45px] h-[45px] overflow-hidden">
        <img className="w-full h-full" src={img} alt={userName} />
      </div>
      <div className="mr-auto ml-2 flex flex-col">
        <p className="text-[16px] font-bold text-[#0D1C2E]">{userName}</p>
      </div>
    </div>
  );
};

export default User;
