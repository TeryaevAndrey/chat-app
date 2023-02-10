import React, { FC } from "react";
import { NavigateFunction, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegPage from "./pages/RegPage";
import Cookies from "universal-cookie";

const App: FC = () => {
  const cookies: Cookies = new Cookies();
  const navigate: NavigateFunction = useNavigate();

  React.useEffect(() => {
    if(!cookies.get("token")) {
      navigate("/auth/entrance");
    } else {
      navigate("/");
    }
  }, [cookies.get("token")]);

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/entrance" element={<LoginPage />} />
        <Route path="/auth/reg" element={<RegPage />} />
      </Routes>
    </div>
  );
};

export default App;
