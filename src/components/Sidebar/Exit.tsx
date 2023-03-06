import axios from "axios";
import { useStore } from "effector-react";
import React from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { $userInfo, setUserInfo } from "../../store/userInfo";

const Exit = () => {
  const navigate = useNavigate();
  const userInfo = useStore($userInfo);

  const exitFromAccount = async (e: React.MouseEvent<HTMLElement>) => {
    
    await axios.get(process.env.REACT_APP_PROXY + "/api/auth/exit", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    })

    setUserInfo({
      token: undefined,
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
