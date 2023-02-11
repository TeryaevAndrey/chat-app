import { createEvent, createStore } from "effector";
import { IDialog } from "../types";

export const setFoundDialogs = createEvent<IDialog[] | []>();

export const $foundDialogs = createStore<IDialog[] | []>([]);

$foundDialogs.on(setFoundDialogs, (state, data) => state = data);
