import axios, { Axios, AxiosResponse } from "axios";
import { useStore } from "effector-react";
import React from "react";
import { $searchInfo } from "../../../store/search";
import User from "./User/User";
import config from "config";
import { IDialog, IUser } from "../../../types";
import { $userInfo } from "../../../store/userInfo";
import { useNavigate } from "react-router-dom";
import Cookies, { Cookie } from "universal-cookie";
import { $dialogId, setDialogId } from "../../../store/dialogId";

const UsersList = () => {
  const navigate = useNavigate();
  const dialogId = useStore($dialogId);
  const userInfo = useStore($userInfo);
  const searchInfo = useStore($searchInfo);
  const [user, setUser] = React.useState<IUser | undefined>(undefined);
  const [allUsers, setAllUsers] = React.useState<IUser[] | undefined>(
    undefined
  );
  const [myDialogs, setMyDialogs] = React.useState<IDialog[] | []>([]);

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_PROXY}/api/users/users-search?q=${searchInfo.value}`
      )
      .then(async (res: AxiosResponse) => {
        const userData = res.data.user;
        if (res.data.user) {
          delete userData.password;
          setUser(userData);
        } else {
          setUser(undefined);
        }
      });
  }, [searchInfo]);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY}/api/users/all-users?limit=5`)
      .then(async (res: AxiosResponse) => {
        if (res.data.users) {
          res.data.users.forEach((user: any) => {
            delete user.password;
          });

          setAllUsers(res.data.users);
        }
      });
  }, []);

  React.useEffect(() => {
    const cookies: Cookie = new Cookies();

    axios
      .get(`${process.env.REACT_APP_PROXY}/api/dialog/my-dialogs`, {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res: AxiosResponse) => {
        if (res.data.dialogs) {
          setMyDialogs(res.data.dialogs);
        }
      });
  }, [dialogId]);

  const createNewDialog = async (comradeId: string, comradeName: string) => {
    const cookies: Cookie = new Cookies();

    await axios
      .post(
        `${process.env.REACT_APP_PROXY}/api/dialog/new-dialog`,
        {
          comradeId,
          comradeName,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      )
      .then((res: AxiosResponse) => {
        setDialogId(res.data.dialogId);

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col w-[100%] mt-[25px] overflow-auto mb-[50px]">
      {user ? (
        <User
          userName={user && user.name}
          onClick={() => createNewDialog(user._id, user.name)}
        />
      ) : searchInfo.isFocus ? (
        <>
          <p className="mb-3 ml-[30px]">Все пользователи...</p>
          {allUsers?.map((user) => {
            return (
              <User
                key={user._id}
                userName={user.name}
                onClick={() => createNewDialog(user._id, user.name)}
              />
            );
          })}
        </>
      ) : (
        myDialogs.map((dialog) => {
          return (
            <User
              key={dialog._id}
              userName={
                userInfo.userId === dialog.mainUserId
                  ? dialog.comradeName
                  : dialog.mainUserName
              }
              onClick={() =>
                createNewDialog(
                  dialog.comradeId,
                  dialog.comradeName
                )
              }
            />
          );
        })
      )}
    </div>
  );
};

export default UsersList;
