import { createEvent, createStore } from "effector";

interface IUserInfo {
  avatar?: string | undefined;
  userId: string | undefined;
  userName: string | undefined;
  isOnline: boolean;
  wasOnline: string | undefined;
}

export const setFellowData = createEvent<IUserInfo>();

export const $fellowData = createStore<IUserInfo>({
  avatar: undefined,
  userId: undefined,
  userName: undefined,
  isOnline: false,
  wasOnline: undefined,
});

$fellowData.on(setFellowData, (state, data) => state = data);