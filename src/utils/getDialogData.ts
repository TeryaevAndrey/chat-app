import { setAlertErrorInfo } from "./../store/alerts/alertError";
import axios, {AxiosResponse} from "axios";
import { setDialogInfo } from "../store/dialogInfo";
import { cookies } from "../core/cookies";

const getDialogData = async (dialogId: string) => {

  await axios.post(process.env.REACT_APP_PROXY + "/api/dialogs/get-dialog-info", {
    dialogId
  }, {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`
    }
  }).then((res: AxiosResponse) => {
    setDialogInfo(res.data.dialog);
  }).catch((err) => {
    setAlertErrorInfo({
      isError: true,
      title: err.response.data.message
    });

    setTimeout(() => {
      setAlertErrorInfo({
        isError: false, 
        title: undefined
      })
    }, 3000);
  })
}

export default getDialogData;