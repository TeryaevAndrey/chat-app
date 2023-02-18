import React, { FC } from "react";
import User from "./User";
import { FiMoreHorizontal } from "react-icons/fi";
import { useParams } from "react-router-dom";
import getDialogInfo from "../../../utils/getDialogInfo";
import { useStore } from "effector-react";
import { $currentDialogInfo } from "../../../store/currenDialogInfo";
import { $userInfo } from "../../../store/userInfo";
import getFellowData from "../../../utils/getFellowData";
import { $fellowData } from "../../../store/fellowInfo";

const Header: FC = () => {
  const {dialogId} = useParams();
  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(false);
  const dialogInfo = useStore($currentDialogInfo);
  const userInfo = useStore($userInfo);
  const fellowData = useStore($fellowData);
  
  React.useEffect(() => {
    if(dialogId) {
      getDialogInfo(dialogId);
    }
  }, [dialogId]);

  React.useEffect(() => {
    if(dialogInfo.fellow && dialogInfo.creator) {
      if(userInfo.userId === dialogInfo.creator) {
       getFellowData(dialogInfo.fellow);
        
      } else {
        getFellowData(dialogInfo.creator);
      }
    }
  }, [dialogInfo, userInfo.userId]);


  const menuHandler = () => {
    setIsOpenMenu(!isOpenMenu);
  }

  return (
    <div className="flex justify-between items-center min-h-[70px] px-5 py-3 border-b-[1px] border-[rgba(112, 124, 151, 0.1)] border-solid relative">
      <User src={fellowData.avatar || "/img/avatar.png"} name={fellowData.userName!} />
      <div className="cursor-pointer" onClick={menuHandler}>
        <FiMoreHorizontal size="30" color="rgb(96,169,246)" />
      </div>
      <div
        className={`block max-w-[200px] w-full max-h-[150px] absolute top-[100%] right-0 bg-[#f6f6fa] rounded-[6px] z-[2]`}
      >
        <div
          className={`flex flex-col h-auto ${
            isOpenMenu ? "max-h-[150px]" : "max-h-[0]"
          } overflow-hidden ease-linear duration-200`}
        >
          <div className="flex flex-col h-[102%] min-h-[50px]">
            <div
              className={`border-b-[1px] border-solid border-[rgba(112, 124, 151, 0.1)] px-3 py-2 ease-linear duration-200 opacity-[${
                isOpenMenu ? "1" : "0"
              }] hover:border-[#B71A1A] cursor-pointer text-[#B71A1A]`}
            >
              Удалить переписку
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
