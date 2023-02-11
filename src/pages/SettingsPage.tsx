import React, { FC } from "react";

const SettingsPage: FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] h-[80%] bg-white rounded-[7px] py-[40px] px-[20px]">
        <form className="flex flex-col items-center w-full">
          <div className="w-[150px] h-[150px] rounded-[50%] overflow-hidden relative">
            <img className="w-full h-full" src="/img/avatar.png" alt="avatar" />
          </div>
          <div className="flex flex-col w-full mt-[40px] gap-[15px]">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Имя пользователя"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
