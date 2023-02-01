import React, { FC } from "react";

interface ITextField {
  type: string;
  placeholder: string;
  onChange: React.ChangeEventHandler;
  value: string;
}

const TextField: FC<ITextField> = ({ type, placeholder, onChange, value }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={`w-[100%] bg-slate-100 min-h-[44px] border-b-[1px] px-4 transition-all duration-200 ease-linear text-[#000]`}
      style={{borderBottomColor: `${value.length > 0 ? "green" : "white"}`}}
    />
  );
};

export default TextField;
