import axios, { AxiosResponse } from "axios";
import { useStore } from "effector-react";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { removeMessages } from "../../../../store/messages";
import { $myDialogs, setMyDialogs } from "../../../../store/myDialogs";
import { $userInfo } from "../../../../store/userInfo";
import { IDialog } from "../../../../types";
import Dialog from "./Dialog/Dialog";

const Dialogs: FC = () => {
  const userInfo = useStore($userInfo);
  const myDialogs = useStore($myDialogs);
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
    <div className="flex flex-col">
      {myDialogs &&
        myDialogs.map((dialog: IDialog) => {
          return (
            <Dialog
              onClick={() => navigateToDialog(dialog._id)}
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
              lastMessage={dialog.lastMessage ? dialog.lastMessage : undefined}
            />
          );
        })}
    </div>
  );
};

export default Dialogs;
