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
import { $myDialogs, setMyDialogs } from "../../store/myDialogs";
import axios, { AxiosResponse } from "axios";

const DialogPage: FC = () => {
  const userInfo = useStore($userInfo);
  const dialogInfo = useStore($dialogInfo);
  const { dialogId } = useParams();
  const myDialogs = useStore($myDialogs);

  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_PROXY + "/api/dialogs/get-my-dialogs", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((res: AxiosResponse) => {
        myDialogs.forEach((dialog) => {
          socket.emit("ROOM:LEAVE", dialog._id);
        });

        setMyDialogs(res.data.dialogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    getUserData(userInfo.token!);
  }, [userInfo.token]);

  React.useEffect(() => {
    if (dialogId !== "empty") {
      getDialogData(dialogId!, userInfo.token!);
    }
  }, []);

  React.useEffect(() => {
    if (dialogId && userInfo.token) {
      getMessages(dialogId, userInfo.token);
    }
  }, [dialogId, userInfo.token]);

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
    const token = JSON.parse(localStorage.getItem("userInfo") || "{}").token;

    socket.io.opts.query = {
      token: token ? token : undefined,
    };

    socket.connect();
  }, [userInfo]);

  return (
    <div className="h-screen flex flex-col justify-between overflow-hidden">
      <Header />
      <Field />
      <Footer />
    </div>
  );
};

export default DialogPage;
