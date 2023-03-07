import React, { FC } from 'react';

const Profile: FC = () => {
    return (
        <div className="w-12 h-12 rounded-full overflow-hidden cursor-pointer">
            <img className="w-full h-full" src="/img/avatar.png" alt="avatar" />
        </div>
    );
};

export default Profile;