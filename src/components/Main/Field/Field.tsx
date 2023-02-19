import axios, { AxiosResponse } from 'axios';
import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { setAlertErrorInfo } from '../../../store/alerts/alertError';
import { $fellowData } from '../../../store/fellowData';
import { $userInfo } from '../../../store/userInfo';
import { IMessage } from '../../../types';
import Message from './Message';

const Field: FC = () => {
  const {dialogId} = useParams();
  const fellowData = useStore($fellowData);
  const userInfo = useStore($userInfo);
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  React.useEffect(() => {
    axios.get(process.env.REACT_APP_PROXY + `/api/messages/get-messages/${dialogId}`).then((res: AxiosResponse) => {
      setMessages((prev) => [...prev, res.data.messages]);
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
    });
  }, [dialogId]);

  return (
    <div className="field w-full h-full overflow-auto flex">
      <div className="w-full h-auto flex flex-col mx-5 my-5 mt-auto">
        {
          messages.map((message) => {
            return <Message avatarImg={message.sender === userInfo.userId ? userInfo.avatar! : fellowData.avatar!} message={message.message} isMyMessage={message.sender === userInfo.userId ? true : false} />
          })
        }
        <Message avatarImg="/img/avatar.png" message="Привет" isMyMessage={true} />
        <Message avatarImg="/img/avatar.png" message="Привет, как дела?" isMyMessage={false} />
        <Message avatarImg="/img/avatar.png" message="Привет, как дела?" isMyMessage={true} />

      </div>
    </div>
  );
};

export default Field;