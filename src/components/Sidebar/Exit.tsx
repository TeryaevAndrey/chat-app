import React from 'react';
import {AiOutlinePoweroff} from "react-icons/ai";

const Exit = () => {
  return (
    <div className="cursor-pointer flex items-center gap-2 ml-4 mt-auto mb-10">
      <AiOutlinePoweroff size="20" />
      <span className="inline-block text-[16px] font-bold text-[#707C97] hover:text-[#60A9F6] ease-linear duration-200">
        Выйти
      </span>
    </div>
  );
};

export default Exit;