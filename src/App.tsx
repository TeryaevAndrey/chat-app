import React, { FC } from "react";
import AlertSuccess from "./components/Alerts/AlertSuccess";
import AlertError from "./components/Alerts/AlertError";
import useRoutes from "./AppRoutes";
import getUserData from "./utils/getUserData";
import { cookies } from "./core/cookies";

const App: FC = () => {
  const [isAuth, setIsAuth] = React.useState<boolean>(false);

  React.useEffect(() => {
    getUserData();
  }, []);

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
