import { useStore } from "effector-react";
import React, { FC } from "react";
import { $userInfo } from "../../store/userInfo";
import Dialogs from "../components/Main/Dialogs/Dialogs";
import Header from "../components/Main/Header/Header";
import Menu from "../components/Main/Menu/Menu";
import getUserData from "../../utils/getUserData";
import { $searchValue } from "../../store/search";
import { $foundDialogs } from "../../store/foundDialogs";
import Dialog from "../components/Main/Dialogs/Dialog/Dialog";
import Users from "../components/Main/Users/Users";
import socket from "../../core/socket";
import { $myDialogs } from "../../store/myDialogs";

const MainPageMob: FC = () => {
  const userInfo = useStore($userInfo);
  const searchValue = useStore($searchValue);
  const foundDialogs = useStore($foundDialogs);
  const myDialogs = useStore($myDialogs);

  React.useEffect(() => {
    getUserData(userInfo.token!);
  }, [userInfo.token]);

  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userInfo") || "{}").token;

    socket.io.opts.query = {
      token: token ? token : undefined,
    };

    socket.connect();
  }, [userInfo]);

  return (
    <div>
      <Header />

      {searchValue.length ? (
        <>
          {foundDialogs.length > 0 && (
            <div className="pb-[10px]">
              {foundDialogs.map((dialog) => {
                return (
                  <Dialog
                    key={dialog._id}
                    img={
                      userInfo.userId === dialog.creator._id
                        ? dialog.fellow.avatar
                        : dialog.creator.avatar
                    }
                    userName={
                      userInfo.userId === dialog.creator._id
                        ? dialog.fellow.userName
                        : dialog.fellow.userName
                    }
                    lastMessage={
                      dialog.lastMessage ? dialog.lastMessage : undefined
                    }
                  />
                );
              })}
            </div>
          )}
          <p className="mx-2 text-sm font-light">Глобальный поиск</p>
          <Users />
        </>
      ) : (
        <Dialogs />
      )}

      <Menu />
    </div>
  );
};

export default MainPageMob;
