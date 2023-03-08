import { useStore } from "effector-react";
import React, { FC } from "react";
import { $dialogInfo } from "../../../../store/dialogInfo";
import { $fellowData } from "../../../../store/fellowData";
import { $userInfo } from "../../../../store/userInfo";
import getFellowData from "../../../../utils/getFellowData";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const fellowData = useStore($fellowData);
  const userInfo = useStore($userInfo);
  const dialogInfo = useStore($dialogInfo);
  const navigate = useNavigate();

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

  const backHandler = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-between mx-2 py-3 pb-2">
      <div
        className="cursor-pointer flex items-center gap-1"
        onClick={backHandler}
      >
        <div>
          <IoChevronBackOutline size="20" />
        </div>
        <span className="inline-block text-sm font-light">Назад</span>
      </div>
      <div className="mt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <img
              className="w-full h-full"
              src={fellowData.avatar ? fellowData.avatar : "/img/avatar.png"}
              alt={fellowData.userName}
            />
          </div>
          <div className="flex flex-col">
            <span className="inline-block text-base font-medium leading-none">
              {fellowData.userName}
            </span>
            <span className="inline-block text-sm font-light">
              {fellowData.isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
