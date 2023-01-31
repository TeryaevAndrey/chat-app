import React, { FC } from "react";

const Header: FC = () => {
  return (
    <div className="flex items-center w-[100%] min-h-[48px] gap-3 bg-[#A7C9DC] px-[30px] py-[10px]">
      <div className="flex items-center gap-3">
        <img
          className="w-[30px] h-[30px] rounded-[50%] overflow-auto"
          src="/img/avatar-man.png"
          alt="avatar"
        />
        <span className="inline-block text-[14px] font-semibold">
          VladilenPupkin
        </span>
      </div>
      <span className="inline-block text-[12px] font-semibold">
        Печатает...
      </span>
    </div>
  );
};

export default Header;
