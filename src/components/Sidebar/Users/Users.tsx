import React, {FC} from 'react';
import { useStore } from 'effector-react';
import { $users } from '../../../store/users';
import { IUser } from '../../../types';
import User from './User/User';
import Cookies, { Cookie } from 'universal-cookie';
import { $userInfo } from '../../../store/userInfo';
import axios from 'axios';
import { setCurrentDialogId } from '../../../store/currentDialogId';
import { useNavigate } from 'react-router-dom';

const Users: FC = () => {
  const users = useStore($users);
  const userInfo = useStore($userInfo);
  const cookies: Cookie = new Cookies();
  const navigate = useNavigate();

  const createNewDialog = async (
    fellow: string,
    fellowAvatar: string,
    fellowName: string,
    lastMessage: string | undefined
  ) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_PROXY + "/api/dialogs/new-dialog",
        {
          creator: userInfo.userId,
          fellow,
          creatorAvatar: userInfo.avatar,
          fellowAvatar,
          creatorName: userInfo.userName,
          fellowName,
          lastMessage: lastMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      );

      navigate(`/${userInfo.userId}/${res.data.dialogId}`);

      return setCurrentDialogId(res.data.dialogId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dialogs users flex flex-col gap-3 mt-5 h-[45%] overflow-auto">
      {
        users.map((user: IUser) => {
          return <User onClick={() => createNewDialog(user._id, user.avatar, user.userName, undefined)} key={user._id} img={user.avatar.length === 0 ? "/img/avatar.png" : user.avatar} userName={user.userName} />
        })
      }      
    </div>
  );
};

export default Users;