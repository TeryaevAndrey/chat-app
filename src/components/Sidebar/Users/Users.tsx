import React, { FC } from "react";
import { useStore } from "effector-react";
import { $users } from "../../../store/users";
import { IUser } from "../../../types";
import User from "./User/User";
import axios, { AxiosResponse } from "axios";
import { $userInfo } from "../../../store/userInfo";
import { useNavigate } from "react-router-dom";
import { setAlertErrorInfo } from "../../../store/alerts/alertError";
import { removeMessages } from "../../../store/messages";

const Users: FC = () => {
  const users = useStore($users);
  const userInfo = useStore($userInfo);
  const navigate = useNavigate();

  const createNewDialog = async (
    fellow: string,
    fellowAvatar: string,
    fellowName: string
  ) => {
    await axios
      .post(
        process.env.REACT_APP_PROXY + "/api/dialogs/new-dialog",
        {
          creator: userInfo.userId,
          fellow,
          creatorAvatar: userInfo.avatar,
          fellowAvatar,
          creatorName: userInfo.userName,
          fellowName,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      )
      .then((res: AxiosResponse) => {
        removeMessages([]);

        navigate(`/${userInfo.userId}/${res.data.dialogId}`);
      })
      .catch((err) => {
        setAlertErrorInfo({
          isError: true,
          title: err.response.data.message,
        });

        setTimeout(() => {
          setAlertErrorInfo({
            isError: false,
            title: undefined,
          });
        }, 3000);
      });

      console.log(fellowName);
  };

  return (
    <div className="dialogs users flex flex-col gap-3 mt-5 h-[45%] overflow-auto">
      {users.map((user: IUser) => {
        return (
          <User
            onClick={() =>
              createNewDialog(
                user._id,
                user.avatar || "/img/avatar.png",
                user.userName
              )
            }
            key={user._id}
            img={user.avatar.length === 0 ? "/img/avatar.png" : user.avatar}
            userName={user.userName}
          />
        );
      })}
    </div>
  );
};

export default Users;
