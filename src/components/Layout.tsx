import React, {FC} from 'react';

interface ILayout {
  children: React.ReactNode
}

const Layout: FC<ILayout> = ({children}) => {
  return (
    <div className="min-h-[100vh] w-[100%] flex justify-center items-center">
      {children}
    </div>
  );
};

export default Layout;