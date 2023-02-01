import React, { FC } from 'react';
import Main from '../components/Main/Main';
import Sidebar from '../components/Sidebar/Sidebar';


const MainPage:FC = () => {
  return (
    <div className="h-[100%] w-[100%] flex justify-center items-center">
      <div className="w-[100%] bg-[#8DB3C9] h-[100vh] overflow-hidden flex items-start">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
};

export default MainPage;