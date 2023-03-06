import React, { FC } from "react";
import AlertSuccess from "./components/Alerts/AlertSuccess";
import AlertError from "./components/Alerts/AlertError";
import useRoutes from "./AppRoutes";
import { useStore } from "effector-react";
import { $userInfo, setUserInfo } from "./store/userInfo";

const App: FC = () => {
  const [isAuth, setIsAuth] = React.useState<boolean>(false);
  const userInfo = useStore($userInfo);

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

  return (
    <div className="min-h-screen">
      <AlertSuccess />
      <AlertError />
      {useRoutes(isAuth)}
    </div>
  );
};

export default App;
