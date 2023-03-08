import { useStore } from "effector-react";
import React from "react";
import { useParams } from "react-router-dom";
import Message from "../../../../components/Main/Field/Message";
import socket from "../../../../core/socket";
import { $fellowData } from "../../../../store/fellowData";
import { $messages, pushMessage } from "../../../../store/messages";
import { $userInfo } from "../../../../store/userInfo";

const Field = () => {
  const messages = useStore($messages);
  const userInfo = useStore($userInfo);
  const fellowData = useStore($fellowData);
  const { dialogId } = useParams();

  React.useEffect(() => {
    const message = () => {
      socket.on("ROOM:NEW-MESSAGE", (message) => {
        if (dialogId === message.dialog) {
          return pushMessage(message);
        }
      });

      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("pong");
      };
    };

    message();
  }, []);

  return (
    <div className="scrollbar-none w-full h-full overflow-x-hidden overflow-y-auto flex flex-col mt-3.5 mb-[60px]">
      <div className="w-full h-auto flex flex-col mx-5 my-5 mt-auto">
        {messages.length > 0 &&
          messages.map((msg, index) => {
            return (
              <Message
                key={index}
                avatarImg={
                  userInfo.userId === msg.sender
                    ? userInfo.avatar || "/img/avatar.png"
                    : fellowData.avatar || "/img/avatar.png"
                }
                message={msg.message}
                isMyMessage={userInfo.userId === msg.sender ? true : false}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Field;
