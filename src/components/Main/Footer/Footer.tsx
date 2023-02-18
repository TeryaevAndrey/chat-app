import axios, { AxiosResponse } from "axios";
import { useStore } from "effector-react";
import React, { FC } from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import Cookies, { Cookie } from "universal-cookie";
import io from "../../../core/socket";
import { $currentDialogId } from "../../../store/currentDialogId";
import { $userInfo } from "../../../store/userInfo";

const Footer: FC = () => {
  const cookies: Cookie = new Cookies();
  const userInfo = useStore($userInfo);
  const currentDialogId = useStore($currentDialogId);
  const [messageValue, setMessageValue] = React.useState<any>("");

  const onChangeMessageValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageValue(e.target.value);
  }

  const sendMessage = async (e: React.MouseEvent) => {
    e.preventDefault();

    await axios
      .post(
        process.env.REACT_APP_PROXY + "/api/messages/new-message",
        {
          message: messageValue,
          dialog: currentDialogId,
          files: [],
          sender: userInfo.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      ).then((res: AxiosResponse) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
  };

  return (
    <form className="flex items-center min-h-[70px] max-h-[150px] pl-5 pr-4 py-3">
      <div className="cursor-pointer mr-3">
        <AiOutlinePaperClip size="30" color="#0D1C2E" />
      </div>
      <div className="w-full h-full flex items-center">
        <input onChange={onChangeMessageValue} value={messageValue} className="w-full" placeholder="Написать сообщение..." />
      </div>
      <div className="cursor-pointer mr-4">
        <BsFillEmojiSmileFill size="25" color="#0D1C2E" />
      </div>
      <div className="cursor-pointer" onClick={sendMessage}>
        <MdSend size="30" color="#60A9F6" />
      </div>
    </form>
  );
};

export default Footer;
