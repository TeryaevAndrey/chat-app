import React, { FC } from "react";
import { NavigateFunction, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegPage from "./pages/RegPage";
import Cookies, { Cookie } from "universal-cookie";
import { useStore } from "effector-react";
import AlertSuccess from "./components/Alerts/AlertSuccess";
import AlertError from "./components/Alerts/AlertError";
import { $userInfo, setUserInfo } from "./store/userInfo";
import SettingsPage from "./pages/SettingsPage";
import useRoutes from "./AppRoutes";

const App: FC = () => {
  const userInfo = useStore($userInfo);
  const navigate = useNavigate();
  const cookies: Cookie = new Cookies();
  const [isAuth, setIsAuth] = React.useState<boolean>(false);

  React.useEffect(() => {
    const localStorageUserInfo = JSON.parse(
      localStorage.getItem("userInfo") || "{}"
    );

    if (localStorageUserInfo) {
      setUserInfo({
        userId: localStorageUserInfo.userId,
        token: localStorageUserInfo.token,
        userName: localStorageUserInfo.userName,
      });
    } else {
      setUserInfo({
        userId: undefined,
        token: undefined,
        userName: undefined,
      });
    }
  }, []);

  React.useEffect(() => {
    userInfo.token ? setIsAuth(true) : setIsAuth(false);
  }, [userInfo]);

  return (
    <div className="min-h-screen">
      <AlertSuccess />
      <AlertError />
      {
        useRoutes(isAuth)
      }
    </div>
  );
};

export default App;
