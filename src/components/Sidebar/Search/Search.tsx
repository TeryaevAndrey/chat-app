import React, { FC } from 'react';

const Search: FC = () => {
  return (
    <div className="px-[30px] mt-[30px]">
      <div className="bg-[#fff] min-h-[40px] rounded-[15px] flex items-center px-[5px]">
        <img className="w-[20px] h-[20px]" src="./img/search.svg" alt="search" />
        <input className="w-[100%] text-[#000] bg-transparent pl-[5px]" placeholder="Введите имя" />
      </div>
    </div>
  );
};

export default Search;