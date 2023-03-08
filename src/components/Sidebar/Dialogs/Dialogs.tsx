import axios, { AxiosResponse } from "axios";
import { useStore } from "effector-react";
import React, { FC } from "react";
import { $myDialogs, setMyDialogs } from "../../../store/myDialogs";
import { $userInfo } from "../../../store/userInfo";
import { IDialog } from "../../../types";
import Dialog from "./Dialog/Dialog";
import { useNavigate } from "react-router-dom";
import { removeMessages } from "../../../store/messages";

const Dialogs: FC = () => {
  const myDialogs = useStore($myDialogs);
  const userInfo = useStore($userInfo);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_PROXY + "/api/dialogs/get-my-dialogs", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((res: AxiosResponse) => {
        setMyDialogs(res.data.dialogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigateToDialog = async (dialogId: string) => {
    removeMessages([]);
    navigate(`/${userInfo.userId}/${dialogId}`);
  };

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
              onClick={() => navigateToDialog(dialog._id)}
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
