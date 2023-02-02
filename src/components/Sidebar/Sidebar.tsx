import { useStore } from "effector-react";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie/cjs/Cookies";
import { Cookie } from "universal-cookie/cjs/types";
import { $userInfo, updateUserInfo } from "../../store/userInfo";
import Search from "./Search/Search";
import UserMain from "./UserMain/UserMain";
import UsersList from "./UsersList/UsersList";

const Sidebar: FC = () => {
  const navigate = useNavigate();
  const userInfo = useStore($userInfo);

  const exitFromProfile = async () => {
    const cookies: Cookie = new Cookies();

    await cookies.remove("token");

    localStorage.removeItem("userInfo");

    updateUserInfo({
      userId: undefined,
      name: undefined,
    });

    navigate("/auth");
  };

  return (
    <div className="max-w-[20%] w-[100%] h-[100%] flex flex-col">
      <UserMain userName={userInfo.name ? userInfo.name : "Загрузка"} id={userInfo.userId ? userInfo.userId.slice(0, 10) + "..." : "Загрузка"} />
      <Search />
      <UsersList />

      <img
        onClick={exitFromProfile}
        className="w-[30px] h-[30px] ml-[25px] mt-[auto] mb-[25px] cursor-pointer"
        src="/img/exit.svg"
        alt="exit"
      />
    </div>
  );
};

export default Sidebar;
