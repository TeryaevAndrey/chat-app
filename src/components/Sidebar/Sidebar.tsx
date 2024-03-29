import { useStore } from "effector-react";
import React, { FC } from "react";
import { $foundDialogs } from "../../store/foundDialogs";
import { $searchValue } from "../../store/search";
import { $userInfo } from "../../store/userInfo";
import { $users } from "../../store/users";
import Dialog from "./Dialogs/Dialog/Dialog";
import Dialogs from "./Dialogs/Dialogs";
import Exit from "./Exit";
import ProfileInfo from "./ProfileInfo";
import Search from "./Search";
import Users from "./Users/Users";

const Sidebar: FC = () => {
  const searchValue = useStore($searchValue);
  const foundDialogs = useStore($foundDialogs);
  const userInfo = useStore($userInfo);

  return (
    <div className="w-[30%] h-full border-r-[1px] border-[rgba(112, 124, 151, 0.1)] border-solid flex flex-col">
      <ProfileInfo
        img={userInfo.avatar ? userInfo.avatar : "/img/avatar.png"}
        name={userInfo.userName}
      />
      <Search />
      {searchValue.length ? (
        <>
          {foundDialogs.length > 0 && (
            <div className="pb-[10px] border-b-[1px] border-[rgba(112, 124, 151, 0.1)] border-solid">
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
          <Users />
        </>
      ) : (
        <Dialogs />
      )}
      <Exit />
    </div>
  );
};

export default Sidebar;
