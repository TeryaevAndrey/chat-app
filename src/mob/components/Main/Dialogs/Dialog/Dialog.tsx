import React, { FC } from "react";

const Dialog: FC = () => {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-[#ccc] cursor-pointer">
      <div className="w-[45px] h-[45px] rounded-[50%] overflow-hidden">
        <img className="w-full h-full" src={"/img/avatar.png"} alt="username" />
      </div>
      <div className="flex flex-col">
        <p className="text-base font-medium">Username</p>
        <span className="text-sm font-light">Last Message</span>
      </div>
    </div>
  );
};

export default Dialog;
