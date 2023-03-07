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

const MainPageMob: FC = () => {
  const userInfo = useStore($userInfo);
  const searchValue = useStore($searchValue);
  const foundDialogs = useStore($foundDialogs);

  React.useEffect(() => {
    getUserData(userInfo.token!);
  }, [userInfo.token]);

  return (
    <div>
      <Header />

      {searchValue.length ? (
        <>
          {foundDialogs.length > 0 && (
            <div className="pb-[10px]">
              {foundDialogs.map((dialog) => {
                let img = "";
                let userName = "";

                if (userInfo.userId === dialog.creator) {
                  if (dialog.fellowAvatar.length === 0) {
                    img = "/img/avatar.png";
                  }
                  img = dialog.fellowAvatar;
                  userName = dialog.fellowName;
                } else {
                  if (dialog.creatorAvatar.length === 0) {
                    img = "/img/avatar.png";
                  }
                  img = dialog.creatorAvatar;
                  userName = dialog.creatorName;
                }

                return (
                  <Dialog
                    key={dialog._id}
                    img={img}
                    userName={userName}
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
