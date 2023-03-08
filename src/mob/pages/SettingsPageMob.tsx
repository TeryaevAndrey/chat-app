import axios from "axios";
import { useStore } from "effector-react";
import React, { FC } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { $userInfo, setUserInfo } from "../../store/userInfo";
import Menu from "../components/Main/Menu/Menu";

const SettingsPageMob: FC = () => {
  const navigate = useNavigate();
  const userInfo = useStore($userInfo);

  const exitFromAccount = async () => {
    await axios.get(process.env.REACT_APP_PROXY + "/api/auth/exit", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

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
    <>
      <div className="flex flex-col min-h-screen overflow-y-auto w-full">
        <div
          className="text-base font-normal py-3 w-full bg-white border-b border-[#ccc] active:opacity-50 px-2"
          onClick={() => navigate("/")}
        >
          Вернуться к моим чатам
        </div>
        <div
          className="flex items-center gap-3 py-3 w-full bg-white border-b border-[#ccc] active:opacity-50 px-2"
          onClick={exitFromAccount}
        >
          <AiOutlinePoweroff color="red" size="20" />
          <span className="inline-block text-base font-normal text-[red]">
            Выход
          </span>
        </div>
      </div>
      <Menu />
    </>
  );
};

export default SettingsPageMob;
