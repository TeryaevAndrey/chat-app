import { setAlertErrorInfo } from "./../store/alerts/alertError";
import axios, { AxiosResponse } from "axios";
import { setFellowData } from "../store/fellowData";

const getFellowData = async (userId: string, token: string) => {
  await axios
    .post(
      process.env.REACT_APP_PROXY + "/api/users/get-user",
      {
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res: AxiosResponse) => {
      setFellowData(res.data.user);
    })
    .catch((err) => {
      setAlertErrorInfo({
        isError: true,
        title: err.response.data.message,
      });

      setTimeout(() => {
        setAlertErrorInfo({
          isError: false,
          title: undefined,
        });
      }, 3000);
    });
};

export default getFellowData;
