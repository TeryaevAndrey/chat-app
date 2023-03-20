import { useStore } from "effector-react";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import socket from "../../../core/socket";
import { $fellowData } from "../../../store/fellowData";
import { $messages, pushMessage, setMessages } from "../../../store/messages";
import { $userInfo } from "../../../store/userInfo";
import Message from "./Message";

const Field: FC = () => {
  const messages = useStore($messages);
  const userInfo = useStore($userInfo);
  const fellowData = useStore($fellowData);
  const { dialogId } = useParams();
  const containerRef = React.useRef<any>(null);

  React.useEffect(() => {
    const handleNewMessage = (message: any) => {
      if (dialogId === message.dialog) {
        pushMessage(message);
      }
    };

    socket.on("ROOM:NEW-MESSAGE", handleNewMessage);

    return () => {
      socket.off("ROOM:NEW-MESSAGE", handleNewMessage);
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, [dialogId, socket]);

  React.useEffect(() => {
    const container = containerRef.current;
    const lastMsg = container?.lastChild;

    if (container) {
      container.scrollTop = lastMsg?.offsetTop - container.offsetTop;
    }
  }, [messages]);

  return (
    <div
      className="field w-full h-full overflow-x-hidden overflow-y-auto flex"
      ref={containerRef}
    >
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
