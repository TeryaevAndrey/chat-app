import {createEvent, createStore} from "effector";

interface IUserInfo {
  userId: string | undefined;
  token: string | undefined;
  userName: string | undefined;
}

export const setUserInfo = createEvent<IUserInfo>();

export const $userInfo = createStore<IUserInfo>({
  userId: undefined,
  token: undefined,
  userName: undefined
});

$userInfo.on(setUserInfo, (state, data) => state = data);
