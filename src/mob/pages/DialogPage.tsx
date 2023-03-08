import { useStore } from "effector-react";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import socket from "../../core/socket";
import { $dialogInfo } from "../../store/dialogInfo";
import { $fellowData } from "../../store/fellowData";
import { $userInfo } from "../../store/userInfo";
import getDialogData from "../../utils/getDialogData";
import getFellowData from "../../utils/getFellowData";
import getMessages from "../../utils/getMessages";
import Footer from "../components/DIalog/Footer/Footer";
import Header from "../components/DIalog/Header/Header";

const DialogPage: FC = () => {
  const userInfo = useStore($userInfo);
  const dialogInfo = useStore($dialogInfo);
  const {dialogId} = useParams();

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
    <div>
      <Header />
      <Footer />
    </div>
  );
};

export default DialogPage;
