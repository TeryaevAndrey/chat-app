import React, { FC } from 'react';
import Dialog from './Dialog/Dialog';

const Dialogs: FC = () => {
  return (
    <div className="dialogs flex flex-col gap-3 mt-5 h-[45%] overflow-auto">
      <Dialog img="/img/avatar.png" name="Nika Jerrardo" lastMessage="Привет" isNewMessage={true} isActive={true} />
      <Dialog img="/img/avatar.png" name="Nika Jerrardo" lastMessage="Привет" isNewMessage={true} isActive={false} />
      <Dialog img="/img/avatar.png" name="Nika Jerrardo" isNewMessage={false} isActive={false} />
      <Dialog img="/img/avatar.png" name="Nika Jerrardo" lastMessage="Привет" isNewMessage={true} isActive={false} />
      <Dialog img="/img/avatar.png" name="Nika Jerrardo" lastMessage="Привет" isNewMessage={true} isActive={false} />
      <Dialog img="/img/avatar.png" name="Nika Jerrardo" lastMessage="Привет" isNewMessage={true} isActive={false} />
      <Dialog img="/img/avatar.png" name="Nika Jerrardo" lastMessage="Привет" isNewMessage={true} isActive={false} />
    </div>
  );
};

export default Dialogs;