import axios from "axios";
import Cookies, { Cookie } from "universal-cookie";
import { setCurrentDialogInfo } from "../store/currenDialogInfo";

const getDialogInfo = async(dialogId: string) => {
  const cookies: Cookie = new Cookies();

  const res = await axios.post(process.env.REACT_APP_PROXY + "/api/dialogs/get-dialog-info", {
    dialogId
  }, {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`
    }
  });

  setCurrentDialogInfo(res.data.dialog);
}

export default getDialogInfo;