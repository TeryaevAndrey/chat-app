import { useStore } from "effector-react";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { $userInfo } from "../../../../../store/userInfo";

const Profile: FC = () => {
  const userInfo = useStore($userInfo);
  const navigate = useNavigate();

  return (
    <div
      className="w-12 h-12 rounded-full overflow-hidden cursor-pointer"
      onClick={() => navigate(`/settings/${userInfo.userId}`)}
    >
      <img
        className="w-full h-full"
        src={userInfo.avatar ? userInfo.avatar : "/img/avatar.png"}
        alt={userInfo.userName}
      />
    </div>
  );
};

export default Profile;
