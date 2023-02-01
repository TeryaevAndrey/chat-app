import React, { FC } from 'react';
import Field from './Field/Field';
import Footer from './Footer/Footer';
import Header from './Header';

const Main: FC = () => {
  return (
    <div className="max-w-[80%] w-[100%] h-[100%] flex flex-col">
      <Header />
      <Field />

      <Footer />
    </div>
  );
};

export default Main;