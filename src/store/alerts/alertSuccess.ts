import { createEvent, createStore } from "effector";

interface IAlertSuccessInfo {
  isSuccess: boolean;
  title: undefined | string;
}

export const setAlertSuccessInfo = createEvent<IAlertSuccessInfo>();

export const $alertSuccessInfo = createStore<IAlertSuccessInfo>({
  isSuccess: false,
  title: undefined,
});

$alertSuccessInfo.on(setAlertSuccessInfo, (state, data) => (state = data));
