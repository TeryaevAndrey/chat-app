import { createEvent, createStore } from "effector";

export const setSearchValue = createEvent<string>();

export const $searchValue = createStore<string>("");

$searchValue.on(setSearchValue, (state, data) => (state = data));
