import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegPage from "./pages/RegPage";
import SettingsPage from "./pages/SettingsPage";

const useRoutes = (isAuth: boolean) => {
  if (isAuth) {
    return (
      <Routes>
        <Route path="/:id/:dialogId" element={<MainPage />} />
        <Route path="/auth/entrance" element={<LoginPage />} />
        <Route path="/auth/reg" element={<RegPage />} />
        <Route path="/settings/:id" element={<SettingsPage />} />
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

export default useRoutes;
