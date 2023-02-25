import { createEvent, createStore } from "effector";

export const setCurrentDialogId = createEvent<any>();

export const $currentDialogId = createStore<any>("empty");

$currentDialogId.on(setCurrentDialogId, (state, data) => (state = data));
