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
  creator: string;
  fellow: string;
  creatorAvatar: string;
  fellowAvatar: string;
  creatorName: string;
  fellowName: string;
  lastMessage: string;
}

export interface IMessage {
  message: string;
  dialog: string;
  files?: [];
  sender: string;
}