import { useStore } from "effector-react";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import Message from "./Message";
import { $dialogId } from "../../../store/dialogId";
import { $userInfo } from "../../../store/userInfo";
import { $searchInfo } from "../../../store/search";
import { IMessage } from "../../../types";

interface IField {
  messages: IMessage[];
}

const Field: FC<IField> = ({messages}) => {
  const userInfo = useStore($userInfo);
  console.log(messages);
  return (
    <div className="bg-[#758A96] w-[100%] h-[100%] flex flex-col">
      <div className="flex flex-col gap-[5px] mx-[25px] my-[20px] mt-[auto]">
        {
          messages.map((message, index) => {
            return <Message key={index} message={message.message} my={userInfo.userId === message.from ? true : false} />
          })
        }
      </div>
    </div>
  );
};

export default Field;
