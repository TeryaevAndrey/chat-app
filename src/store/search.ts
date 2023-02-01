import {createEvent, createStore} from "effector";

interface ISearch {
  value: string;
  isFocus: boolean;
}

export const setSearchInfo = createEvent<ISearch>();

export const $searchInfo = createStore<ISearch>({
  value: "",
  isFocus: false
});

$searchInfo.on(setSearchInfo, (state, data: ISearch) => state = data);