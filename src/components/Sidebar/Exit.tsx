import React from 'react';
import {AiOutlinePoweroff} from "react-icons/ai";
import Cookies, { Cookie } from 'universal-cookie';
import { setUserInfo } from '../../store/userInfo';

const Exit = () => {
  const cookies: Cookie = new Cookies();

  const exitFromAccount = async (e: React.MouseEvent<HTMLElement>) => {
    await cookies.remove("token");

    setUserInfo({
      userId: undefined,
      token: undefined, 
      userName: undefined
    });

    localStorage.removeItem("userInfo");
  } 

  return (
    <div className="cursor-pointer flex items-center gap-2 ml-4 mt-auto mb-10" onClick={exitFromAccount}>
      <AiOutlinePoweroff size="20" />
      <span className="inline-block text-[16px] font-bold text-[#707C97] hover:text-[#60A9F6] ease-linear duration-200">
        Выйти
      </span>
    </div>
  );
};

export default Exit;