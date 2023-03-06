import axios from "axios";
import { setUserInfo } from "../store/userInfo";

const getUserData = async (token: string) => {
  const res = await axios.get(
    process.env.REACT_APP_PROXY + "/api/users/get-my-data",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return setUserInfo({
    token,
    avatar: res.data.avatar,
    userId: res.data.userId,
    userName: res.data.userName,
    isOnline: res.data.isOnline,
    wasOnline: res.data.wasOnline,
  });
};

export default getUserData;
