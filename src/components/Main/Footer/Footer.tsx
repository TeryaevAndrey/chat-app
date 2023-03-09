import axios, { AxiosResponse } from "axios";
import { useStore } from "effector-react";
import React, { FC } from "react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { useParams } from "react-router-dom";
import socket from "../../../core/socket";
import { setAlertErrorInfo } from "../../../store/alerts/alertError";
import { $messages, setMessages } from "../../../store/messages";
import { $userInfo } from "../../../store/userInfo";

const Footer: FC = () => {
  const [messageValue, setMessageValue] = React.useState<string>("");
  const { dialogId } = useParams();
  const userInfo = useStore($userInfo);
  const messages = useStore($messages);
  const messageValueRef = React.useRef<HTMLInputElement>(null);

  const onChangeMessageValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageValue(e.target.value);
  };

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    socket.emit("ROOM:NEW-MESSAGE", {
      message: messageValue,
      dialog: dialogId,
      sender: userInfo.userId,
    });

    await axios
      .post(
        process.env.REACT_APP_PROXY + "/api/messages/new-message",
        {
          message: messageValue,
          dialog: dialogId,
          sender: userInfo.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      .then((res: AxiosResponse) => {
        setMessages([
          ...messages,
          {
            _id: res.data.newMessage._id,
            message: res.data.newMessage.message,
            dialog: res.data.newMessage.dialog,
            files: res.data.newMessage.files,
            sender: res.data.newMessage.sender,
          },
        ]);

        setMessageValue("");

        messageValueRef.current?.focus();
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
  };

  return (
    <form className="flex items-center min-h-[70px] max-h-[150px] pl-5 pr-4 py-3">
      {/* <div className="cursor-pointer mr-3">
        <AiOutlinePaperClip size="30" color="#0D1C2E" />
      </div> */}
      <div className="w-full h-full flex items-center">
        <input
          onChange={onChangeMessageValue}
          value={messageValue}
          className="w-full"
          placeholder="Написать сообщение..."
          ref={messageValueRef}
        />
      </div>
      {/* <div className="cursor-pointer mr-4">
        <BsFillEmojiSmileFill size="25" color="#0D1C2E" />
      </div> */}
      <button onClick={sendMessage} className="cursor-pointer">
        <MdSend size="30" color="#60A9F6" />
      </button>
    </form>
  );
};

export default Footer;
