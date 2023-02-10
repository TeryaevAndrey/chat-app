import React, { FC } from 'react';

interface IAlertSuccess {
  isSuccess: boolean;
  title: string;
}

const AlertSuccess: FC<IAlertSuccess> = ({isSuccess, title}) => {
  return (
    <div className={`fixed top-0 ${isSuccess ? "right-0" : "right-[-100%]"} text-white bg-green-400 px-5 py-3 rounded-bl-[5px] ease-linear duration-300`}>
      Успешно!
    </div>
  );
};

export default AlertSuccess;