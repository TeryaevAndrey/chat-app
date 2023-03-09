import axios, { AxiosResponse } from "axios";
import { useStore } from "effector-react";
import React, { FC } from "react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { useParams } from "react-router-dom";
import socket from "../../../../core/socket";
import { setAlertErrorInfo } from "../../../../store/alerts/alertError";
import { $messages, setMessages } from "../../../../store/messages";
import { $userInfo } from "../../../../store/userInfo";

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
    <form className="bg-white rounded-t-[30px] w-full fixed bottom-0">
      <div className="px-2 py-3 w-full flex items-center justify-between">
        <input
          onChange={onChangeMessageValue}
          value={messageValue}
          className="w-full px-2"
          type="text"
          placeholder="Введите сообщение..."
          ref={messageValueRef}
        />
        {/* <div className="cursor-pointer mr-4">
          <BsFillEmojiSmileFill size="25" color="#0D1C2E" />
        </div> */}
        <button className="cursor-pointer" onClick={sendMessage}>
          <MdSend size="30" color="#60A9F6" />
        </button>
      </div>
    </form>
  );
};

export default Footer;
