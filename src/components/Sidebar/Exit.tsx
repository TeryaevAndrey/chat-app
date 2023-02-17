import axios from "axios";
import React from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Cookies, { Cookie } from "universal-cookie";
import { setUserInfo } from "../../store/userInfo";

const Exit = () => {
  const navigate = useNavigate();

  const exitFromAccount = async (e: React.MouseEvent<HTMLElement>) => {
    const cookies: Cookie = new Cookies();

    await cookies.remove("token");

    setUserInfo({
      avatar: undefined,
      userId: undefined,
      userName: undefined,
      isOnline: false,
      wasOnline: undefined,
    });

    localStorage.removeItem("userInfo");

    navigate("/auth/entrance");
  };

  return (
    <div
      className="cursor-pointer flex items-center gap-2 ml-4 mt-auto mb-10"
      onClick={exitFromAccount}
    >
      <AiOutlinePoweroff size="20" />
      <span className="inline-block text-[16px] font-bold text-[#707C97] hover:text-[#60A9F6] ease-linear duration-200">
        Выйти
      </span>
    </div>
  );
};

export default Exit;
