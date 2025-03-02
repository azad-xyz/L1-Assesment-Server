import { IUser } from '../user/user.interface';

export interface IAgent extends IUser {
  isApproved: boolean;
}
