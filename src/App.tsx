import React, { FC } from "react";
import Cookies, { Cookie } from "universal-cookie";
import AlertSuccess from "./components/Alerts/AlertSuccess";
import AlertError from "./components/Alerts/AlertError";
import useRoutes from "./AppRoutes";
import getUserData from "./utils/getUserData";

const App: FC = () => {
  const cookies: Cookie = new Cookies();
  const [isAuth, setIsAuth] = React.useState<boolean>(false);

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
