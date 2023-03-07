import { useStore } from "effector-react";
import React, { FC } from "react";
import { $searchValue, setSearchValue } from "../../../../store/search";

const Header: FC = () => {
  const searchValue = useStore($searchValue);

  const changeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

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
