/* eslint-disable no-unused-vars */
export enum AccountType {
  USER = 'User',
  AGENT = 'Agent',
  ADMIN = 'Admin',
}

export interface IUser {
  name: string;
  pin: string;
  mobileNumber: string;
  email: string;
  accountType: AccountType;
  nid: number;
  balance: number;
  isDeleted: boolean;
  isApproved: boolean;
  isLoggedIn: boolean;
}
