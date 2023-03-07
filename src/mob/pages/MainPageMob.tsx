import { useStore } from "effector-react";
import React, { FC } from "react";
import { $userInfo } from "../../store/userInfo";
import Dialogs from "../components/Main/Dialogs/Dialogs";
import Header from "../components/Main/Header/Header";
import Menu from "../components/Main/Menu/Menu";
import getUserData from "../../utils/getUserData";
import { $searchValue } from "../../store/search";

const MainPageMob: FC = () => {
  const userInfo = useStore($userInfo);
  const searchValue = useStore($searchValue);

  React.useEffect(() => {
    getUserData(userInfo.token!);
  }, [userInfo.token]);

  return (
    <div>
      <Header />

      <div>
        <Dialogs />
      </div>

      <Menu />
    </div>
  );
};

export default MainPageMob;
