import { useStore } from "effector-react";
import React, { FC } from "react";
import { $searchInfo, setSearchInfo } from "../../../store/search";

const Search: FC = () => {
  const searchInfo = useStore($searchInfo);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInfo({ ...searchInfo, value: e.target.value });
  };

  const onFocusSearch = () => {
    setSearchInfo({ ...searchInfo, isFocus: true });
  };

  const onBlurSearch = () => {
    setSearchInfo({ ...searchInfo, isFocus: false });
  };

  return (
    <div className="px-[30px] mt-[30px]">
      <div className="bg-[#fff] min-h-[40px] rounded-[15px] flex items-center px-[5px]">
        <img
          className="w-[20px] h-[20px]"
          src="./img/search.svg"
          alt="search"
        />
        <input
          onFocus={onFocusSearch}
          onBlur={onBlurSearch}
          onChange={onChangeValue}
          value={searchInfo.value}
          className="w-[100%] text-[#000] bg-transparent pl-[5px]"
          placeholder="Введите имя"
        />
      </div>
    </div>
  );
};

export default Search;
