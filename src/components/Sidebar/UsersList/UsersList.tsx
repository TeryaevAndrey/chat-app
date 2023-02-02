import axios, { Axios, AxiosResponse } from "axios";
import { useStore } from "effector-react";
import React from "react";
import { $searchInfo } from "../../../store/search";
import User from "./User/User";
import config from "config";
import { IUser } from "../../../types";
import { $userInfo } from "../../../store/userInfo";

const UsersList = () => {
  const searchInfo = useStore($searchInfo);
  const userInfo = useStore($userInfo);
  const [user, setUser] = React.useState<IUser | undefined>(undefined);
  const [allUsers, setAllUsers] = React.useState<IUser[] | undefined>(
    undefined
  );

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

  const createNewDialog = async (comradeId: string) => {
    await axios.post(`${process.env.REACT_APP_PROXY}/api/dialog/new-dialog`, {
      comradeId
    }, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    });
    
    alert("OK");
  }

  return (
    <div className="flex flex-col w-[100%] mt-[25px] overflow-auto mb-[50px]">
      {user ? (
        <User userName={user && user.name} onClick={() => createNewDialog(user._id)} />
      ) : (
        searchInfo.isFocus &&
        allUsers?.map((user) => {
          return <User key={user._id} userName={user.name} />;
        })
      )}
    </div>
  );
};

export default UsersList;
