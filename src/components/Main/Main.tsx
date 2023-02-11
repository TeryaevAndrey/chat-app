import React, { FC } from 'react';
import Field from './Field/Field';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const Main: FC = () => {
  return (
    <div className="w-[70%] h-full flex flex-col justify-between">
      <Header />
      <Field />
      <Footer />
    </div>
  );
};

export default Main;