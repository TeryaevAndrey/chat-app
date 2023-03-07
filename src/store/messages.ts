import { createEvent, createStore } from "effector";
import { IMessage } from "../types";

export const setMessages = createEvent<IMessage[]>();
export const removeMessages = createEvent<[]>();
export const pushMessage = createEvent<IMessage>();

export const $messages = createStore<IMessage[] | []>([]);

$messages.on(setMessages, (state, data) => (state = data));
$messages.on(removeMessages, (state, data) => (state = data));
$messages.on(pushMessage, (state, data) => [...state, data]);
