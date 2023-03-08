import { createEvent, createStore } from "effector";

interface IFellowData {
  _id: string | undefined;
  avatar: string | undefined;
  userName: string | undefined;
  isOnline: boolean | undefined;
  wasOnline: boolean | undefined;
  createdAt: string | undefined;
  updatedAt: string | undefined;
}

export const setFellowData = createEvent<IFellowData>();

export const $fellowData = createStore<IFellowData>({
  _id: undefined,
  avatar: undefined,
  userName: undefined,
  isOnline: undefined,
  wasOnline: undefined,
  createdAt: undefined,
  updatedAt: undefined,
});

$fellowData.on(setFellowData, (state, data) => (state = data));
