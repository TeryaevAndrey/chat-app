import React, { FC } from 'react';
import Main from '../components/Main/Main';
import Sidebar from '../components/Sidebar/Sidebar';


const MainPage:FC = () => {
  return (
    <div className="h-[100%] w-[100%] flex justify-center items-center">
      <div className="max-w-[900px] w-[100%] bg-[#8DB3C9] rounded-[30px] h-[670px] overflow-hidden flex items-start">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
};

export default MainPage;