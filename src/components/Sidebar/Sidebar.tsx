import React, {FC} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie/cjs/Cookies';
import { Cookie } from 'universal-cookie/cjs/types';
import UserMain from './UserMain/UserMain';
import UsersList from './UsersList/UsersList';

const Sidebar: FC = () => {
  const navigate = useNavigate();

  const exitFromProfile = async () => {
    const cookies: Cookie = new Cookies();

    await cookies.remove("token");

    localStorage.removeItem("userInfo");

    navigate("/auth");
  }

  return (
    <div className="max-w-[210px] w-[100%] h-[100%] flex flex-col">
      <UserMain userName="sosiskaKiller" id="12123124" />
      <UsersList />

      <img onClick={exitFromProfile} className="w-[30px] h-[30px] ml-[25px] mt-[auto] mb-[25px] cursor-pointer" src="/img/exit.svg" alt="exit" />
    </div>
  );
};

export default Sidebar;