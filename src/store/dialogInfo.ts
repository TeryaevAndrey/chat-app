import { createEvent, createStore } from "effector";

interface IDialogInfo {
  _id: string | undefined,
  creator: string | undefined,
  fellow: string | undefined,
  creatorAvatar: string | undefined,
  fellowAvatar: string | undefined,
  creatorName: string | undefined,
  fellowName: string | undefined,
  lastMessage: string | undefined,
}

export const setDialogInfo = createEvent<IDialogInfo>();

export const $dialogInfo = createStore<IDialogInfo>({
  _id: undefined,
  creator: undefined,
  fellow: undefined,
  creatorAvatar: undefined,
  fellowAvatar: undefined,
  creatorName: undefined,
  fellowName: undefined,
  lastMessage: undefined,
});

$dialogInfo.on(setDialogInfo, (state, data) => state = data);