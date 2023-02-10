import React, { FC } from 'react';

interface IAlertError {
  isError: boolean;
  title: string;
}

const AlertError: FC<IAlertError> = ({isError, title}) => {
  return (
    <div className={`fixed top-0 ${isError ? "right-0" : "right-[-100%]"} text-white bg-red-500 px-5 py-3 rounded-bl-[5px] ease-linear duration-300`}>
      {title}
    </div>
  );
};

export default AlertError;