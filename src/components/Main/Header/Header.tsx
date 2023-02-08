import React, { FC } from "react";
import User from "./User";
import { FiMoreHorizontal } from "react-icons/fi";

const Header: FC = () => {
  return (
    <div className="flex justify-between items-center min-h-[70px] px-5 py-3 border-b-[1px] border-[rgba(112, 124, 151, 0.1)] border-solid">
      <User src="/img/avatar.png" name="Nika Jerrardo" />
      <div className="cursor-pointer">
        <FiMoreHorizontal size="30" color="rgb(96,169,246)" />
      </div>
    </div>
  );
};

export default Header;
