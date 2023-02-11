import {createEvent, createStore} from "effector";
import { IDialog } from "../types";

export const setMyDialogs = createEvent<IDialog[] | []>();

export const $myDialogs = createStore<IDialog[] | []>([]);

$myDialogs.on(setMyDialogs, (state, data) => state = data);