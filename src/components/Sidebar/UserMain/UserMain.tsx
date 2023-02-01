import React, { FC } from "react";

interface IUserMain {
  userName: string;
  id: string;
}

const UserMain: FC<IUserMain> = ({userName, id}) => {
  return (
    <div className="flex items-center gap-3 pt-[20px] px-[30px]">
      <img
        className="max-w-[55px] w-[100%] h-[auto] rounded-[50%] overflow-hidden"
        src="/img/avatar-man.png"
        alt="avatar"
      />
      <div className="flex flex-col gap-[3px]">
        <span className="inline-block text-[14px] font-semibold">
          {userName}
        </span>
        <p className="tooltip relative inline-block text-[12px]">{id}</p>
      </div>
    </div>
  );
};

export default UserMain;
