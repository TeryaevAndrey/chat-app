import React, { FC } from "react";
import { useParams } from "react-router-dom";
import Field from "./Field/Field";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const Main: FC = () => {
  const { dialogId } = useParams();

  return (
    <div className="w-[70%] h-full flex flex-col justify-between">
      {dialogId === "empty" ? (
        <div className="flex justify-center items-center h-full">Выберите диалог...</div>
      ) : (
        <>
          <Header />
          <Field />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Main;
