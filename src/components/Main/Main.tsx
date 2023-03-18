import { useStore } from "effector-react";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import socket from "../../core/socket";
import { $dialogInfo } from "../../store/dialogInfo";
import { $foundDialogs } from "../../store/foundDialogs";
import { $myDialogs } from "../../store/myDialogs";
import { $userInfo } from "../../store/userInfo";
import checkToken from "../../utils/checkToken";
import getDialogData from "../../utils/getDialogData";
import getFellowData from "../../utils/getFellowData";
import getMessages from "../../utils/getMessages";
import Field from "./Field/Field";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const Main: FC = () => {
  const { dialogId } = useParams();
  const userInfo = useStore($userInfo);
  const dialogInfo = useStore($dialogInfo);
  const myDialogs = useStore($myDialogs);

  React.useEffect(() => {
    if (dialogId !== "empty") {
      getDialogData(dialogId!, userInfo.token!);
    }
  }, [dialogId]);

  React.useEffect(() => {
    if (userInfo.userId === dialogInfo.creator) {
      if (dialogInfo.fellow) {
        getFellowData(dialogInfo.fellow, userInfo.token!);
      }
    } else {
      if (dialogInfo.creator) {
        getFellowData(dialogInfo.creator, userInfo.token!);
      }
    }
  }, [dialogInfo, userInfo.userId]);

  React.useEffect(() => {
    if (dialogId && userInfo.token) {
      getMessages(dialogId, userInfo.token);
    }
  }, [dialogId]);

  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userInfo") || "{}").token;

    socket.io.opts.query = {
      token: token ? token : undefined,
    };

    socket.connect();
  }, [userInfo]);

  return (
    <div className="w-[70%] h-full flex flex-col justify-between">
      {dialogId === "empty" ? (
        <div className="flex justify-center items-center h-full">
          Выберите диалог...
        </div>
      ) : (
        <>
          <Header />
          <Field />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Main;
