import { createEvent, createStore } from "effector";

export const setDialogId = createEvent<string>();

export const $dialogId = createStore<string>("empty");

$dialogId.on(setDialogId, (state, data) => state = data);