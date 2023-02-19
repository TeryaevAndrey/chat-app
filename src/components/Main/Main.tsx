import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { $dialogInfo } from '../../store/dialogInfo';
import { $userInfo } from '../../store/userInfo';
import { IMessage } from '../../types';
import getDialogData from '../../utils/getDialogData';
import getFellowData from '../../utils/getFellowData';
import Field from './Field/Field';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const Main: FC = () => {
  const {dialogId} = useParams();
  const userInfo = useStore($userInfo);
  const dialogInfo = useStore($dialogInfo);
  const [messages, setMessages] = React.useState<IMessage[] | []>([]);

  React.useEffect(() => {
    if(dialogId !== "empty") {
      getDialogData(dialogId!);
    }
  }, [dialogId]);

  React.useEffect(() => {
    if(userInfo.userId === dialogInfo.creator) {
      if(dialogInfo.fellow) {
        getFellowData(dialogInfo.fellow)
      }
    } else {
      if(dialogInfo.creator) {
        getFellowData(dialogInfo.creator);
      }
    }
  }, [dialogInfo, userInfo.userId]);

  return (
    <div className="w-[70%] h-full flex flex-col justify-between">
      {
        dialogId === "empty" ? (
          <div className="flex justify-center items-center h-full">Выберите диалог...</div>
        ) : (
          <>
            <Header />
            <Field messages={messages} setMessages={setMessages} />
            <Footer />
          </>
        )
      }
    </div>
  );
};

export default Main;