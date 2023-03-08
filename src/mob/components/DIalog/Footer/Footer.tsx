import React, { FC } from "react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { MdSend } from "react-icons/md";

const Footer: FC = () => {
  return (
    <form className="bg-white rounded-t-[30px] fixed bottom-0 w-full">
      <div className="px-2 py-3 w-full flex items-center justify-between">
        <input
          className="w-full"
          type="text"
          placeholder="Введите сообщение..."
        />
        <div className="cursor-pointer mr-4">
          <BsFillEmojiSmileFill size="25" color="#0D1C2E" />
        </div>
        <button className="cursor-pointer">
          <MdSend size="30" color="#60A9F6" />
        </button>
      </div>
    </form>
  );
};

export default Footer;
