import {createEvent, createStore} from "effector";
import {IUser} from "../types";

export const setUsers = createEvent<IUser[] | []>();

export const $users = createStore<IUser[] | []>([]);

$users.on(setUsers, (state, data) => state = data);