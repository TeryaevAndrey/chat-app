import React from 'react';
import User from './User/User';

const UsersList = () => {
  return (
    <div className="flex flex-col w-[100%] mt-[25px] overflow-auto mb-[50px]">
      <User userName="vladilenSosiska" />
      <User userName="vladilenSosiska" />
      <User userName="vladilenSosiska" />
      <User userName="vladilenSosiska" />
      <User userName="vladilenSosiska" />
    </div>
  );
};

export default UsersList;