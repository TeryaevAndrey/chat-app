import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { $searchValue } from '../../../store/search';
import Dialog from './Dialog/Dialog';

const Dialogs: FC = () => {
  return (
    <div className="dialogs flex flex-col gap-3 mt-5 h-[45%] overflow-auto">
      
    </div>
  );
};

export default Dialogs;