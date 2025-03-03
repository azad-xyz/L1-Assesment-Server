import { model, Schema } from 'mongoose';
import { AccountType, IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    pin: { type: String, required: true },
    mobileNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    accountType: {
      type: String,
      enum: [AccountType.USER],
      required: true,
    },
    nid: { type: Number, required: true, unique: true },
    balance: { type: Number, default: 40 },
    isDeleted: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: true },
    isLoggedIn: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const User = model<IUser>('User', userSchema);
