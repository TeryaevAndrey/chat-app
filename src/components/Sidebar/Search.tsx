import axios, { AxiosResponse } from "axios";
import { useStore } from "effector-react";
import React, { FC } from "react";
import { $searchValue, setSearchValue } from "../../store/search";
import { $users, setUsers } from "../../store/users";

const Search: FC = () => {
  const searchValue = useStore($searchValue);

  React.useEffect(() => {
    axios
      .post(process.env.REACT_APP_PROXY + "/api/users/users-search", {
        userName: searchValue,
      })
      .then((res: AxiosResponse) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log("Никого нет:(");
      });
  }, [searchValue]);

  const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const onFocusSearch = async () => {
    if (searchValue.length === 0) {
      await axios
        .get(
          process.env.REACT_APP_PROXY +
            "/api/users/get-all-users?limit=10&page=0"
        )
        .then((res: AxiosResponse) => {
          console.log(res);
          setUsers(res.data.users);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onBlurSearch = async () => {
    setUsers([]);
  };

  return (
    <div className="flex justify-center mx-[20px] mt-[20px]">
      <div className="mb-3 xl:w-96">
        <input
          onFocus={onFocusSearch}
          onBlur={onBlurSearch}
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
