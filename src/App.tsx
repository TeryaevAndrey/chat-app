import React, { FC } from 'react';
import AuthPage from './pages/AuthPage';
import {Routes, Route} from "react-router-dom";
import MainPage from './pages/MainPage';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { Cookie } from 'universal-cookie/cjs/types';
import { $userInfo, updateUserInfo } from './store/userInfo';
import { useStore } from 'effector-react';
import { $dialogId } from './store/dialogId';

const App: FC = () => {
  const navigate = useNavigate();
  const dialogId = useStore($dialogId);
  const userInfo = useStore($userInfo);

  React.useEffect(() => {
    const cookies: Cookie = new Cookies();
  
    if(!cookies.get("token")) {
      navigate("/auth");
    } else {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

      navigate(`/${userInfo.userId}?${dialogId}`);
    }
  }, [navigate, dialogId]);

  React.useEffect(() => {
    const localStorageUserInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    
    if(localStorageUserInfo) {
      updateUserInfo({
        userId: localStorageUserInfo.userId,
        name: localStorageUserInfo.name
      });
    } else {
      updateUserInfo({
        userId: undefined,
        name: undefined
      });
    }
  }, []);

  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/:id?/:dialog" element={<MainPage />} />
    </Routes>
  );
}

export default App;
