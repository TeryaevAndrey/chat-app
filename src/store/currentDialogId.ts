import {createEvent, createStore} from "effector";

export const setCurrentDialogId = createEvent<string>();

export const $currentDialogId = createStore<string>("");

$currentDialogId.on(setCurrentDialogId, (state, data) => state = data);