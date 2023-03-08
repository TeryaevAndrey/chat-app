import React, { FC } from "react";
import Profile from "./Profile/Profile";
import {FiSettings} from "react-icons/fi";
import {BiMessageSquareEdit} from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Menu: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 min-h-[60px] bg-white w-full rounded-t-[30px] flex py-2">
      <div className="w-full flex items-center justify-between px-8">
        <div className="cursor-pointer" onClick={() => navigate(`/parameters`)}>
            <FiSettings size={25} />
        </div>

        <Profile />

        <div className="cursor-pointer">
          <BiMessageSquareEdit size={25} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
