import React, { FC } from "react";
import AlertSuccess from "./components/Alerts/AlertSuccess";
import AlertError from "./components/Alerts/AlertError";
import useRoutes from "./AppRoutes";
import { useStore } from "effector-react";
import { $userInfo, setUserInfo } from "./store/userInfo";
import checkToken from "./utils/checkToken";
import { useNavigate } from "react-router-dom";

const App: FC = () => {
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const userInfo = useStore($userInfo);
  const navigate = useNavigate();

  React.useEffect(() => {
    JSON.parse(localStorage.getItem("userInfo") || "{}").token
      ? setIsAuth(true)
      : setIsAuth(false);
  }, [userInfo.token]);

  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem("userInfo") || "{}").token) {
      setUserInfo({
        ...userInfo,
        token: JSON.parse(localStorage.getItem("userInfo") || "{}").token,
      });
    }
  }, []);

  React.useEffect(() => {
    const isToken = checkToken();

    if(isToken) {
      navigate("/auth/entrance");
      localStorage.removeItem("userInfo");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <AlertSuccess />
      <AlertError />
      {useRoutes(isAuth)}
    </div>
  );
};

export default App;
