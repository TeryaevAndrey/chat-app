import axios, { AxiosResponse } from "axios";
import { useStore } from "effector-react";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import Cookies, { Cookie } from "universal-cookie";
import { setAlertErrorInfo } from "../../../store/alerts/alertError";
import { $fellowData } from "../../../store/fellowData";
import { $userInfo } from "../../../store/userInfo";
import { IMessage } from "../../../types";
import Message from "./Message";

interface IField {
  messages: IMessage[] | [];
  setMessages: Function
}

const Field: FC<IField> = ({messages, setMessages}) => {
  return (
    <div className="field w-full h-full overflow-auto flex">
      <div className="w-full h-auto flex flex-col mx-5 my-5 mt-auto">
      <Message
              avatarImg={
                "/img/avatar.png"
              }
              message="adsad"
              isMyMessage={true}
            />
      </div>
    </div>
  );
};

export default Field;
