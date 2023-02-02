export interface IUser {
  _id: string;
  name: string;
  isOnline: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IDialog {
  _id: string;
  mainUserId: string;
  comradeId: string;
  createdAt: string;
  updatedAt: string;
  comradeName: string;
  mainUserName: string;
}