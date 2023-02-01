import React, { FC } from 'react';
import AuthPage from './pages/AuthPage';
import {Routes, Route} from "react-router-dom";
import MainPage from './pages/MainPage';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { Cookie } from 'universal-cookie/cjs/types';
import { updateUserInfo } from './store/userInfo';

const App: FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const cookies: Cookie = new Cookies();

    if(!cookies.get("token")) {
      navigate("/auth");
    } else {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

      navigate(`/${userInfo.userId}`);
    }
  }, [navigate]);

  React.useEffect(() => {
    const localStorageUserInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    
    if(localStorageUserInfo) {
      updateUserInfo({
        token: localStorageUserInfo.token,
        userId: localStorageUserInfo.userId,
        name: localStorageUserInfo.name
      });
    } else {
      updateUserInfo({
        token: undefined,
        userId: undefined,
        name: undefined
      });
    }
  }, []);

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/:id" element={<MainPage />} />
    </Routes>
  );
}

export default App;
