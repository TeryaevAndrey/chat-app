import axios from "axios";
import { useStore } from "effector-react";
import React, { FC } from "react";
import {AiOutlinePaperClip} from "react-icons/ai";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import {MdSend} from "react-icons/md";
import { useParams } from "react-router-dom";
import Cookies, { Cookie } from "universal-cookie";
import socket from "../../../core/socket";
import { setAlertErrorInfo } from "../../../store/alerts/alertError";
import { $userInfo } from "../../../store/userInfo";

const Footer: FC = () => {
  const [messageValue, setMessageValue] = React.useState<string>("");
  const cookies: Cookie = new Cookies();
  const {dialogId} = useParams();
  const userInfo = useStore($userInfo);

  const onChangeMessageValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageValue(e.target.value);
  }

  const sendMessage = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    socket.emit("ROOM:NEW-MESSAGE", {
      message: messageValue,
      dialog: dialogId,
      sender: userInfo.userId
    })

    await axios.post(process.env.REACT_APP_PROXY + "/api/messages/new-message", {
        message: messageValue,
        dialog: dialogId,
        sender: userInfo.userId,
    }, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`
      }
    }).catch(err => {
      setAlertErrorInfo({
        isError: true, 
        title: err.response.data.message
      });

      setTimeout(() => {
        setAlertErrorInfo({
          isError: false, 
          title: undefined
        });
      }, 3000);
    })
  }

  return (
    <form className="flex items-center min-h-[70px] max-h-[150px] pl-5 pr-4 py-3">
      {/* <div className="cursor-pointer mr-3">
        <AiOutlinePaperClip size="30" color="#0D1C2E" />
      </div> */}
      <div className="w-full h-full flex items-center">
        <input onChange={onChangeMessageValue} value={messageValue} className="w-full" placeholder="Написать сообщение..." />
      </div>
      <div className="cursor-pointer mr-4">
        <BsFillEmojiSmileFill size="25" color="#0D1C2E" />
      </div>
      <button onClick={sendMessage} className="cursor-pointer">
        <MdSend size="30" color="#60A9F6" />
      </button>
    </form>
  );
};

export default Footer;
