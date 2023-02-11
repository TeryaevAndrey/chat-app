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

const App: FC = () => {
  const userInfo = useStore($userInfo);
  const navigate = useNavigate();

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
    const cookies: Cookie = new Cookies();

    if (!cookies.get("token")) {
      navigate("/auth/entrance");
    } else {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

      navigate("/" + userInfo.userId + "/empty");
    }
  }, [userInfo]);

  return (
    <div className="min-h-screen">
      <AlertSuccess />
      <AlertError />
      <Routes>
        <Route path="/:id/:dialogId" element={<MainPage />} />
        <Route path="/auth/entrance" element={<LoginPage />} />
        <Route path="/auth/reg" element={<RegPage />} />
      </Routes>
    </div>
  );
};

export default App;
