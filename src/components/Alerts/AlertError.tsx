import React, { FC } from "react";
import { useStore } from "effector-react";
import { $alertErrorInfo } from "../../store/alerts/alertError";

const AlertError: FC = () => {
  const alertErrorInfo = useStore($alertErrorInfo);

  return (
    <div
      className={`fixed top-0 ${
        alertErrorInfo.isError ? "right-0" : "right-[-100%]"
      } text-white bg-red-500 px-5 py-3 rounded-bl-[5px] ease-linear duration-300`}
    >
      {alertErrorInfo.title}
    </div>
  );
};

export default AlertError;
