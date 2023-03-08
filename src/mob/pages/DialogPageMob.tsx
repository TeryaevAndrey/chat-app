import { useStore } from "effector-react";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import Field from "../components/DIalog/Field/Field";
import socket from "../../core/socket";
import { $dialogInfo } from "../../store/dialogInfo";
import { $userInfo } from "../../store/userInfo";
import getDialogData from "../../utils/getDialogData";
import getFellowData from "../../utils/getFellowData";
import getMessages from "../../utils/getMessages";
import Footer from "../components/DIalog/Footer/Footer";
import Header from "../components/DIalog/Header/Header";
import { $fellowData } from "../../store/fellowData";
import getUserData from "../../utils/getUserData";

const DialogPage: FC = () => {
  const userInfo = useStore($userInfo);
  const dialogInfo = useStore($dialogInfo);
  const { dialogId } = useParams();
  const fellowData = useStore($fellowData);

  React.useEffect(() => {
    getUserData(userInfo.token!);
  }, [userInfo.token]);

  React.useEffect(() => {
    if (dialogId !== "empty") {
      getDialogData(dialogId!, userInfo.token!);
    }
  }, [dialogId]);

  React.useEffect(() => {
    socket.emit("ROOM:JOIN", dialogId);
  }, [dialogId]);

  React.useEffect(() => {
    if (dialogId && userInfo.token) {
      getMessages(dialogId, userInfo.token);
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

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />
      <Field />
      <Footer />
    </div>
  );
};

export default DialogPage;
