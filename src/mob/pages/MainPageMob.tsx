import React, {FC} from 'react';
import Dialogs from '../components/Main/Dialogs/Dialogs';
import Header from '../components/Main/Header/Header';
import Menu from '../components/Main/Menu/Menu';

const MainPageMob: FC = () => {
    return (
        <div>
            <Header />

            <Dialogs />

            <Menu />
        </div>
    );
};

export default MainPageMob;