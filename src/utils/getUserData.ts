import axios from "axios";
import { cookies } from "../core/cookies";
import { setUserInfo } from "../store/userInfo";

const getUserData = async () => {

  const res = await axios.get(
    process.env.REACT_APP_PROXY + "/api/users/get-my-data",
    {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    }
  );

  return setUserInfo({
    avatar: res.data.avatar,
    userId: res.data.userId,
    userName: res.data.userName,
    isOnline: res.data.isOnline,
    wasOnline: res.data.wasOnline,
  });
};

export default getUserData;