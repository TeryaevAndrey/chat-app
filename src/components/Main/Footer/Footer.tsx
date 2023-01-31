import React, { FC } from 'react';

const Footer: FC = () => {
  return (
    <div className="w-[100%] min-h-[53px] bg-[#A7C9DC] px-[35px] py-[20px]">
      <form className="flex items-center justify-between">
        <input className="w-[100%] text-[14px] text-[#000] placeholder:text-[14px] placeholder:text-[#000] bg-transparent mr-[30px]" type="text" placeholder="Написать сообщение..." />

        <button className="w-[32px] h-[32px]">
          <img className="w-[100%] h-[100%] object-cover" src="/img/send.svg" alt="send" />
        </button>
      </form>
    </div>
  );
};

export default Footer;