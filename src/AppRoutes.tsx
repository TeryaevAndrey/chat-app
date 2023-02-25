import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegPage from "./pages/RegPage";
import SettingsPage from "./pages/SettingsPage";
import { $userInfo } from "./store/userInfo";
import { useStore } from "effector-react";

const AppRoutes = (isAuth: boolean) => {
  const userInfo = useStore($userInfo);

  if (isAuth) {
    return (
      <Routes>
        <Route path="/:id/:dialogId" element={<MainPage />} />
        <Route path="/auth/entrance" element={<LoginPage />} />
        <Route path="/auth/reg" element={<RegPage />} />
        <Route path="/settings/:id" element={<SettingsPage />} />

        <Route
          path="*"
          element={<Navigate to={`/${userInfo.userId}/empty`} replace />}
        />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/auth/entrance" element={<LoginPage />} />
      <Route path="/auth/reg" element={<RegPage />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
