import { model, Schema } from 'mongoose';
import { AccountType, IUser } from './user.interface';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  pin: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  accountType: {
    type: String,
    enum: [AccountType.USER, AccountType.AGENT],
    required: true,
  },
  nid: { type: Number, required: true, unique: true },
  balance: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
});

export const User = model<IUser>('User', userSchema);
