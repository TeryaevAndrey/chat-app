import React, { FC } from "react";
import { useStore } from "effector-react";
import { $alertSuccessInfo } from "../../store/alerts/alertSuccess";

const AlertSuccess: FC = () => {
  const alertSuccessInfo = useStore($alertSuccessInfo);

  return (
    <div
      className={`fixed top-0 ${
        alertSuccessInfo.isSuccess ? "right-0" : "right-[-100%]"
      } text-white bg-green-400 px-5 py-3 rounded-bl-[5px] ease-linear duration-300`}
    >
      {alertSuccessInfo.title}
    </div>
  );
};

export default AlertSuccess;
