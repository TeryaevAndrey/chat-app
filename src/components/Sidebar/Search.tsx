import axios, { AxiosResponse } from "axios";
import { useStore } from "effector-react";
import React, { FC } from "react";
import { setFoundDialogs } from "../../store/foundDialogs";
import { $myDialogs } from "../../store/myDialogs";
import { $searchValue, setSearchValue } from "../../store/search";
import { $userInfo } from "../../store/userInfo";
import { $users, setUsers } from "../../store/users";

const Search: FC = () => {
  const searchValue = useStore($searchValue);
  const myDialogs = useStore($myDialogs);
  const userInfo = useStore($userInfo);

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  React.useEffect(() => {
    if (searchValue.length) {
      const filteredMyDialogs = myDialogs.filter((dialog) => {
        if (userInfo.userId === dialog.creator._id) {
          return dialog.fellow.userName
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        } else {
          return dialog.creator.userName
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        }
      });

      setFoundDialogs(filteredMyDialogs);
    }
  }, [searchValue]);

  React.useEffect(() => {
    if (searchValue.length) {
      axios
        .post(process.env.REACT_APP_PROXY + "/api/users/users-search", {
          userName: searchValue,
        })
        .then((res: AxiosResponse) => {
          setUsers(res.data.users);
        })
        .catch((err) => {
          console.log("Нет совпадений");
        });
    } else {
      setUsers([]);
    }
  }, [searchValue]);

  return (
    <div className="flex justify-center mx-[20px] mt-[20px]">
      <div className="mb-3 xl:w-96">
        <input
          onChange={onChangeSearchValue}
          value={searchValue}
          type="search"
          className="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
          id="exampleSearch"
          placeholder="Найти пользователя"
        />
      </div>
    </div>
  );
};

export default Search;
