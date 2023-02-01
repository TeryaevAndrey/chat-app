import axios, { Axios, AxiosResponse } from "axios";
import { useStore } from "effector-react";
import React from "react";
import { $searchValue } from "../../../store/search";
import User from "./User/User";
import config from "config";
import { IUser } from "../../../types";

const UsersList = () => {
  const searchValue = useStore($searchValue);
  const [user, setUser] = React.useState<IUser | undefined>(undefined);
  const [allUsers, setAllUsers] = React.useState<IUser[] | undefined>(undefined);

  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_PROXY}/api/users/users-search?q=${searchValue}`
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
  }, [searchValue]);

  React.useEffect(() => {
    axios.get(
      `${process.env.REACT_APP_PROXY}/api/users/all-users`
    ).then(async(res: AxiosResponse) => {
      if(res.data.users) {
        res.data.users.forEach((user: any) => {
          delete user.password;
        });

        setAllUsers(res.data.users);
      }
    })
  }, []);

  return (
    <div className="flex flex-col w-[100%] mt-[25px] overflow-auto mb-[50px]">
      {user && (
        <User userName={user && user.name} />
      )}
    </div>
  );
};

export default UsersList;
