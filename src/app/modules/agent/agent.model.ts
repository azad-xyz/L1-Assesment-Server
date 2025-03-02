import { model, Schema } from 'mongoose';
import { IAgent } from './agent.interface';
import { AccountType } from '../user/user.interface';

const agentSchema = new Schema<IAgent>(
  {
    name: { type: String, required: true },
    pin: { type: String, required: true },
    mobileNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    accountType: {
      type: String,
      enum: [AccountType.AGENT],
      required: true,
    },
    nid: { type: Number, required: true, unique: true },
    balance: { type: Number, default: 10000 },
    isDeleted: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Agent = model<IAgent>('Agent', agentSchema);
