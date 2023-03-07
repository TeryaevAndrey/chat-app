import React, { FC } from 'react';
import User from './User/User';

const Users: FC = () => {
    return (
        <div className="flex flex-col">
            <User />
            <User />
            <User />
        </div>
    );
};

export default Users;