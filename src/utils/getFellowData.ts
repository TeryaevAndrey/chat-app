import axios from "axios";
import Cookies, { Cookie } from "universal-cookie";
import { setFellowData } from "../store/fellowInfo";

const getFellowData = async(userId: string) => {
  const cookies: Cookie = new Cookies();

  const res = await axios.post(process.env.REACT_APP_PROXY + "/api/users/get-user", {userId}, {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`
    }
  });

  setFellowData({...res.data.user});
}

export default getFellowData;