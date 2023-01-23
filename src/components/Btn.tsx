import React, {FC} from "react";

interface IBtn {
  title: string;
  onClick?: React.MouseEventHandler;
}

const Btn: FC<IBtn> = ({title, onClick}) => {
  return (
    <button onClick={onClick} className="mt-3 flex justify-center items-center text-white gap-2 bg-blue-600 active:bg-blue-400 hover:bg-blue-500 text-lg font-medium py-2 px-3 rounded-[10px] tracking-wide min-h-[44px]">
      {title}
    </button>
  );
};

export default Btn;
