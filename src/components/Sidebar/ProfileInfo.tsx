import React, { FC } from "react";
import {HiChevronDown} from "react-icons/hi";

interface IProfileInfo {
  img: string;
  name: string;
}

const ProfileInfo: FC<IProfileInfo> = ({ img, name }) => {
  return (
    <div className="flex flex-col items-center pt-[85px] px-[45px]">
      <div className="w-[80px] h-[80px] overflow-hidden rounded-[50%]">
        <img className="w-full h-full object-none" src={img} alt={name} />
      </div>
      <span className="flex items-center gap-1 text-center mt-[15px] cursor-pointer">
          {name}
          <HiChevronDown size="20" />
        </span>
    </div>
  );
};

export default ProfileInfo;
