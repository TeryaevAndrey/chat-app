import React, {FC} from 'react';
import UserMain from './UserMain/UserMain';
import UsersList from './UsersList/UsersList';

const Sidebar: FC = () => {
  return (
    <div className="max-w-[210px] w-[100%] h-[100%] flex flex-col">
      <UserMain userName="sosiskaKiller" id="12123124" />
      <UsersList />

      <img className="w-[30px] h-[30px] ml-[25px] mt-[auto] mb-[25px] cursor-pointer" src="/img/exit.svg" alt="exit" />
    </div>
  );
};

export default Sidebar;