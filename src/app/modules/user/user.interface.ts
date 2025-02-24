export enum AccountType {
  USER = 'User',
  AGENT = 'Agent',
}

export interface IUser {
  name: string;
  pin: string;
  mobileNumber: string;
  email: string;
  accountType: AccountType;
  nid: number;
  balance: number;
}
