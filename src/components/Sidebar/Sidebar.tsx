import React, { FC } from 'react';
import Dialogs from './Dialogs/Dialogs';
import Exit from './Exit';
import ProfileInfo from './ProfileInfo';

const Sidebar: FC = () => {
  return (
    <div className="w-[30%] h-full border-r-[1px] border-[rgba(112, 124, 151, 0.1)] border-solid flex flex-col">
      <ProfileInfo img="/img/avatar.png" name="Henry Jabbawockiez" />
      <Dialogs />
      <Exit />
    </div>
  );
};

export default Sidebar;