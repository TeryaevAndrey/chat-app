import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { $userInfo } from '../../../../../store/userInfo';

const Profile: FC = () => {
    const userInfo = useStore($userInfo);

    return (
        <div className="w-12 h-12 rounded-full overflow-hidden cursor-pointer">
            <img className="w-full h-full" src={userInfo.avatar ? userInfo.avatar : "/img/avatar.png"} alt={userInfo.userName} />
        </div>
    );
};

export default Profile;