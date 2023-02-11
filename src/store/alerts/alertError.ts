import { createEvent, createStore } from "effector";

interface IAlertErrorInfo {
  isError: boolean;
  title: undefined | string;
}

export const setAlertErrorInfo = createEvent<IAlertErrorInfo>();

export const $alertErrorInfo = createStore<IAlertErrorInfo>({
  isError: false,
  title: undefined
});

$alertErrorInfo.on(setAlertErrorInfo, (state, data) => state = data);