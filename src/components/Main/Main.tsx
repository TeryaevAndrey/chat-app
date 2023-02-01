import { useStore } from "effector-react";
import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { $dialogId } from "../../store/dialogId";
import Field from "./Field/Field";
import Footer from "./Footer/Footer";
import Header from "./Header";

const Main: FC = () => {
  const dialogId = useStore($dialogId);

  return (
    <div className="max-w-[80%] w-[100%] h-[100%] flex flex-col">
      {dialogId !== "empty" ? (
        <>
          <Header />
          <Field />

          <Footer />
        </>
      ) : (
        <div className="w-[100%] h-[100%] bg-[#758A96] flex justify-center items-center">
          <span className="inline-block text-[25px] font-semibold text-center">
            Выберите диалог в списке...
          </span>
        </div>
      )}
    </div>
  );
};

export default Main;
