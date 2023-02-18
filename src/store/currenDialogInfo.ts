import { createEvent, createStore } from "effector";

interface IDialogInfo {
  _id: string | undefined;
  creator: string | undefined;
  fellow: string | undefined;
  creatorAvatar: string | undefined;
  fellowAvatar: string | undefined;
  creatorName: string | undefined;
  fellowName: string | undefined;
  lastMessage: string | undefined;
}

export const setCurrentDialogInfo = createEvent<IDialogInfo>();

export const $currentDialogInfo = createStore<IDialogInfo>({
  _id: undefined,
  creator: undefined,
  fellow: undefined,
  creatorAvatar: undefined,
  fellowAvatar: undefined,
  creatorName: undefined,
  fellowName: undefined,
  lastMessage: undefined,
});

$currentDialogInfo.on(setCurrentDialogInfo, (state, data) => state = data);