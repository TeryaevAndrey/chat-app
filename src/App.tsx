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
import axios from "axios";
import getUserData from "./utils/getUserData";

const App: FC = () => {
  const cookies: Cookie = new Cookies();
  const [isAuth, setIsAuth] = React.useState<boolean>(false);

  React.useEffect(() => {
    getUserData();
  }, [cookies]);

  React.useEffect(() => {
    cookies.get("token") ? setIsAuth(true) : setIsAuth(false);
  }, [cookies]);

  return (
    <div className="min-h-screen">
      <AlertSuccess />
      <AlertError />
      {useRoutes(isAuth)}
    </div>
  );
};

export default App;
