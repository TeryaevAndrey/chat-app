import axios, { AxiosResponse } from "axios";
import { removeMessages, setMessages } from "../store/messages";

const getMessages = async (dialogId: string, token: string) => {
  removeMessages([]);
  await axios
    .get(process.env.REACT_APP_PROXY + `/api/messages/get-messages/${dialogId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res: AxiosResponse) => {
      setMessages(res.data.messages);
    });
};

export default getMessages;
