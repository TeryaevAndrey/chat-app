import React, { FC } from 'react';
import AuthPage from './pages/AuthPage';
import {Routes, Route} from "react-router-dom";
import MainPage from './pages/MainPage';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

export default App;
