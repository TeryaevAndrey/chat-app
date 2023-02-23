import React, { FC } from "react";
import socket from "../../../core/socket";
import { IMessage } from "../../../types";
import Message from "./Message";

interface IField {
  messages: IMessage[] | [];
  setMessages: Function
}

const Field: FC<IField> = ({messages, setMessages}) => {
  React.useEffect(() => {
    socket.on("ROOM:NEW-MESSAGE", (message) => {
      console.log(message);
    })
  }, []);

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
