import axios, { AxiosResponse } from "axios";
import { useStore } from "effector-react";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import Cookies, { Cookie } from "universal-cookie";
import io from "../../../core/socket";
import { setCurrentDialogId } from "../../../store/currentDialogId";
import { $myDialogs, setMyDialogs } from "../../../store/myDialogs";
import { $searchValue } from "../../../store/search";
import { $userInfo } from "../../../store/userInfo";
import { $users } from "../../../store/users";
import { IDialog } from "../../../types";
import Dialog from "./Dialog/Dialog";

const Dialogs: FC = () => {
  const cookies: Cookie = new Cookies();
  const myDialogs = useStore($myDialogs);
  const userInfo = useStore($userInfo);
  const users = useStore($users);
  const navigate = useNavigate();

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

  const createNewDialog = async (
    fellow: string,
    fellowAvatar: string,
    fellowName: string,
    lastMessage: string | undefined
  ) => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_PROXY + "/api/dialogs/new-dialog",
        {
          creator: userInfo.userId,
          fellow,
          creatorAvatar: userInfo.avatar,
          fellowAvatar,
          creatorName: userInfo.userName,
          fellowName,
          lastMessage: lastMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        }
      );

      navigate(`/${userInfo.userId}/${res.data.dialogId}`);

      io.on("connection", (socket) => {
        socket.join(res.data.dialogId);
      });

      return setCurrentDialogId(res.data.dialogId);
    } catch (err) {
      console.log(err);
    }
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
              onClick={() => createNewDialog(dialog.fellow, dialog.fellowAvatar, dialog.fellowName, dialog.lastMessage)}
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
