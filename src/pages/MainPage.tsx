import React, { FC } from "react";
import Sidebar from "../components/Sidebar/Sidebar";

const MainPage: FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[60%] h-[80%] bg-white rounded-[7px]">
        <div className="flex items-start w-full h-full">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
