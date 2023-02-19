import axios from "axios";
import Cookies, { Cookie } from "universal-cookie";
import { setUserInfo } from "../store/userInfo";

const getUserData = async () => {
  const cookies: Cookie = new Cookies();

  const res = await axios.get(
    process.env.REACT_APP_PROXY + "/api/users/get-my-data",
    {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    }
  );

  setUserInfo({
    avatar: res.data.avatar,
    userId: res.data.userId,
    userName: res.data.userName,
    isOnline: res.data.isOnline,
    wasOnline: res.data.wasOnline,
  });
};

export default getUserData;