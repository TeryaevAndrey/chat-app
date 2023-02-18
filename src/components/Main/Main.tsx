
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import io from '../../core/socket';
import getUserData from '../../utils/getMyData';
import Field from './Field/Field';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const Main: FC = () => {
  const {dialogId} = useParams();

  console.log(io);

  React.useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="w-[70%] h-full flex flex-col justify-between">
      {
        dialogId !== "empty" ? (
          <>
            <Header />
            <Field />
            <Footer />
          </>
        ) : (
          <div className="flex justify-center items-center h-full">Выберите диалог...</div>
        )
      }
    </div>
  );
};

export default Main;