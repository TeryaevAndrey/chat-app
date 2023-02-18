import axios, { AxiosResponse } from "axios";
import { useStore } from "effector-react";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { $currentDialogId } from "../../../store/currentDialogId";
import Message from "./Message";
import { setAlertErrorInfo } from "../../../store/alerts/alertError";
import { IMessage } from "../../../types";
import { $fellowData } from "../../../store/fellowInfo";
import { $userInfo } from "../../../store/userInfo";
import io from "../../../core/socket";

const Field: FC = () => {
  const currentDialogId = useStore($currentDialogId);
  const fellowData = useStore($fellowData);
  const userInfo = useStore($userInfo);
  const [messages, setMessages] = React.useState<[] | IMessage[]>([]);

  React.useEffect(() => {
    axios
      .get(`/api/messages/get-messages/${currentDialogId}`)
      .then((res: AxiosResponse) => {
        setMessages(res.data.messages);
      })
      .catch((err) => {
        setAlertErrorInfo({
          isError: true,
          title: err.response.data.message,
        });

        setTimeout(() => {
          setAlertErrorInfo({
            isError: false,
            title: undefined,
          });
        }, 3000);
      });
  }, []);

  React.useEffect(() => {
    io.on("SERVER:NEW-MESSAGE", (message) => {
      console.log(message);
      setMessages(prev => [...prev, message]);
    });
  }, []);

  return (
    <div className="field w-full h-full overflow-auto flex">
      <div className="w-full h-auto flex flex-col mx-5 my-5 mt-auto">
        {messages.map((message) => {
          return (
            <Message
              avatarImg={
                message.sender === userInfo.userId
                  ? userInfo.avatar || "/img/avatar.png"
                  : fellowData.avatar || "/img/avatar.png"
              }
              message={message.message}
              isMyMessage={message.sender === userInfo.userId ? true : false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Field;
