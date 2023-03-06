import axios from "axios";
import { setUserInfo } from "../store/userInfo";

const checkToken = async (token: string) => {
  await axios
    .post(process.env.REACT_APP_PROXY + "/api/auth/check-token", {
      token: token,
    })
    .catch((err) => {
      if(err) {
        setUserInfo({
            token: undefined,
            avatar: undefined,
            userId: undefined,
            userName: undefined,
            isOnline: false,
            wasOnline: undefined,
          });
          localStorage.removeItem("userInfo");
      }
    });
};

export default checkToken;
