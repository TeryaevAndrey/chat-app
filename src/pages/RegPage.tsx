import React, { FC } from "react";
import RegForm from "../components/Auth/RegForm";

const RegPage: FC = () => {
  return (
    <div className="max-w-[1200px] mx-[auto] flex justify-center items-center h-full">
      <RegForm />
    </div>
  );
};

export default RegPage;
