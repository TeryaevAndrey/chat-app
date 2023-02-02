import {createEvent, createStore} from "effector";

export const updateUserInfo = createEvent<IUserInfo>();

interface IUserInfo {
  userId: string | undefined;
  name: string | undefined;
}

export const $userInfo = createStore<IUserInfo>({
  userId: undefined,
  name: undefined
});

$userInfo.on(updateUserInfo, (state, data: IUserInfo) => state = data);