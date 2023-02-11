import axios, { AxiosResponse } from "axios";
import { useStore } from "effector-react";
import React, { FC } from "react";
import Cookies, { Cookie } from "universal-cookie";
import { $myDialogs, setMyDialogs } from "../../../store/myDialogs";
import { $searchValue } from "../../../store/search";
import { $userInfo } from "../../../store/userInfo";
import { IDialog } from "../../../types";
import Dialog from "./Dialog/Dialog";

const Dialogs: FC = () => {
  const cookies: Cookie = new Cookies();
  const myDialogs = useStore($myDialogs);
  const userInfo = useStore($userInfo);

  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_PROXY + "/api/dialogs/get-my-dialogs", {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      })
      .then((res: AxiosResponse) => {
        console.log(res);
        setMyDialogs(res.data.dialogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="dialogs flex flex-col gap-3 mt-5 h-[45%] overflow-auto">
      {myDialogs &&
        myDialogs.map((dialog: IDialog) => {
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
              lastMessage={dialog.lastMessage ? dialog.lastMessage : undefined}
            />
          );
        })}
    </div>
  );
};

export default Dialogs;
