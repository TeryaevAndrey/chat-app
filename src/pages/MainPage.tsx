import { useStore } from "effector-react";
import React, { FC } from "react";
import Main from "../components/Main/Main";
import Sidebar from "../components/Sidebar/Sidebar";
import { $userInfo, setUserInfo } from "../store/userInfo";
import getUserData from "../utils/getUserData";

const MainPage: FC = () => {
  const userInfo = useStore($userInfo);

  React.useEffect(() => {
    getUserData(userInfo.token!);
  }, [userInfo.token]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full h-full bg-white rounded-[7px]">
        <div className="flex items-start w-full h-full">
          <Sidebar />
          <Main />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
