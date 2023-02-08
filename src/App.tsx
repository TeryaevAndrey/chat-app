import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegPage from "./pages/RegPage";

const App: FC = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/reg" element={<RegPage />} />
      </Routes>
    </div>
  );
};

export default App;
