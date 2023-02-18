import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import Message from './Message';

const Field: FC = () => {

  return (
    <div className="field w-full h-full overflow-auto flex">
      <div className="w-full h-auto flex flex-col mx-5 my-5 mt-auto">
        <Message avatarImg="/img/avatar.png" message="Привет" isMyMessage={true} />
        <Message avatarImg="/img/avatar.png" message="Привет, как дела?" isMyMessage={false} />
        <Message avatarImg="/img/avatar.png" message="Привет, как дела?" isMyMessage={true} />
      </div>
    </div>
  );
};

export default Field;