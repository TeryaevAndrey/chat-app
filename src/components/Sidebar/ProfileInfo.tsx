import React, { FC } from "react";
import { HiChevronDown } from "react-icons/hi";

interface IProfileInfo {
  img: string;
  name: string;
}

const ProfileInfo: FC<IProfileInfo> = ({ img, name }) => {
  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(false);

  const menuHandler = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <div className="flex flex-col items-center pt-[40px] px-[45px] relative">
      <div className="w-[80px] h-[80px] overflow-hidden rounded-[50%]">
        <img className="w-full h-full object-none" src={img} alt={name} />
      </div>
      <span
        className="flex items-center gap-1 text-center mt-[15px] cursor-pointer"
        onClick={menuHandler}
      >
        {name}
        <HiChevronDown
          style={{
            transform: isOpenMenu ? "rotate(180deg)" : "none",
          }}
          size="20"
        />
      </span>

      <div
        className={`block max-w-[200px] w-full max-h-[150px] absolute top-[100%] bg-[#f6f6fa] rounded-[6px] z-[2]`}
      >
        <div
          className={`flex flex-col h-auto ${
            isOpenMenu ? "max-h-[150px]" : "max-h-[0]"
          } overflow-hidden ease-linear duration-200`}
        >
          <div className="flex flex-col h-[102%] min-h-[50px]">
            <div
              className={`border-b-[1px] border-solid border-[rgba(112, 124, 151, 0.1)] px-3 py-2 ease-linear duration-200 opacity-[${
                isOpenMenu ? "1" : "0"
              }] hover:border-[#0D1C2E] cursor-pointer`}
            >
              Настройки
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
