import axios, { AxiosResponse } from "axios";
import { useStore } from "effector-react";
import React, { FC } from "react";
import { setFoundDialogs } from "../../../../store/foundDialogs";
import { $myDialogs } from "../../../../store/myDialogs";
import { $searchValue, setSearchValue } from "../../../../store/search";
import { $userInfo } from "../../../../store/userInfo";
import { setUsers } from "../../../../store/users";

const Header: FC = () => {
  const searchValue = useStore($searchValue);
  const myDialogs = useStore($myDialogs);
  const userInfo = useStore($userInfo);

  const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div className="py-3">
      <h1 className="text-center text-base text-medium">Мои чаты</h1>
      <div className="relative mx-2 mt-2">
        <input
          onChange={changeSearchValue}
          value={searchValue}
          type="text"
          placeholder="Поиск..."
          className="w-full py-2 pl-11 pr-4 text-base font-normal rounded-full border border-gray-300 bg-gray-100 focus:outline-none focus:bg-white focus:border-blue-500 placeholder:text-base placeholder:font-normal"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            className="w-4 h-4 fill-current text-gray-500"
            viewBox="0 0 16 16"
          >
            <path d="M10.474 11.53a6.5 6.5 0 1 1 .965-.965l3.852 3.852a.75.75 0 1 1-1.06 1.06l-3.852-3.852zM6.5 11.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Header;
