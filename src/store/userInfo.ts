import {createEvent, createStore} from "effector";

interface IUserInfo {
  avatar?: string | undefined;
  userId: string | undefined;
  userName: string | undefined;
  isOnline: boolean;
  wasOnline: string | undefined;
}

export const setUserInfo = createEvent<IUserInfo>();

export const $userInfo = createStore<IUserInfo>({
  avatar: undefined,
  userId: undefined,
  userName: undefined,
  isOnline: false, 
  wasOnline: undefined
});

$userInfo.on(setUserInfo, (state, data) => state = data);
