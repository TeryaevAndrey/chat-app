import React, { FC } from "react";
import Message from "./Message";

const Field: FC = () => {
  return (
    <div className="bg-[#758A96] w-[100%] h-[100%] flex flex-col">
      <div className="flex flex-col gap-[5px] mx-[25px] my-[20px] mt-[auto]">
        <Message message="Привет, как дела?" my={false} />
        <Message message="Привет, всё ок:)" my={true} />
      </div>
    </div>
  );
};

export default Field;
