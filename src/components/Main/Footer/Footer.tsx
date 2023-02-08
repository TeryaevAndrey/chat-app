import React, { FC } from "react";
import {AiOutlinePaperClip} from "react-icons/ai";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import {MdSend} from "react-icons/md";

const Footer: FC = () => {
  return (
    <div className="flex items-center min-h-[70px] max-h-[150px] pl-5 pr-4 py-3">
      <div className="cursor-pointer mr-3">
        <AiOutlinePaperClip size="30" color="#0D1C2E" />
      </div>
      <div className="w-full h-full flex items-center">
        <input className="w-full" placeholder="Написать сообщение..." />
      </div>
      <div className="cursor-pointer mr-4">
        <BsFillEmojiSmileFill size="25" color="#0D1C2E" />
      </div>
      <div className="cursor-pointer">
        <MdSend size="30" color="#60A9F6" />
      </div>
    </div>
  );
};

export default Footer;
