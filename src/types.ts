export interface IUser {
  _id: string;
  avatar: string;
  userName: string;
  isOnline: boolean;
  wasOnline: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IDialog {
  _id: string;
  creator: IUser;
  fellow: IUser;
  lastMessage: string;
}

export interface IMessage {
  _id: string;
  message: string;
  dialog: string;
  files?: [];
  sender: string;
}
