import React, {FC} from 'react';
import { useStore } from 'effector-react';
import { $users } from '../../../store/users';
import { IUser } from '../../../types';
import User from './User/User';

const Users: FC = () => {
  const users = useStore($users);

  return (
    <div className="dialogs users flex flex-col gap-3 mt-5 h-[45%] overflow-auto">
      {
        users.map((user: IUser) => {
          return <User key={user._id} img={user.avatar.length === 0 ? "/img/avatar.png" : user.avatar} userName={user.userName} />
        })
      }      
    </div>
  );
};

export default Users;