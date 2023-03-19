import React, { FC } from "react";
import AlertSuccess from "./components/Alerts/AlertSuccess";
import AlertError from "./components/Alerts/AlertError";
import useRoutes from "./AppRoutes";
import { useStore } from "effector-react";
import { $userInfo, setUserInfo } from "./store/userInfo";
import checkToken from "./utils/checkToken";
import { useNavigate } from "react-router-dom";
import socket from "./core/socket";
import { $myDialogs } from "./store/myDialogs";

const App: FC = () => {
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const userInfo = useStore($userInfo);
  const navigate = useNavigate();
  const myDialogs = useStore($myDialogs);

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
    const isDeadToken = checkToken();

    if (!isDeadToken) {
      socket.io.opts.query = {
        token: userInfo.token ? userInfo.token : undefined,
      };

      socket.connect();
    }
  }, [userInfo.token]);

  React.useEffect(() => {
    const isDeadToken = checkToken();

    if (isDeadToken) {
      navigate("/auth/entrance");
      localStorage.removeItem("userInfo");
    }
  }, [navigate]);

  React.useEffect(() => {
    myDialogs.forEach((dialog) => {
      socket.emit("ROOM:JOIN", dialog._id);
    });
  }, [myDialogs]);

  return (
    <div className="min-h-screen">
      <AlertSuccess />
      <AlertError />
      {useRoutes(isAuth)}
    </div>
  );
};

export default App;
