import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: string;
    isVerified: boolean;
    otp?: string;
    otpExpires?: Date;
    lastOtpSent?: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'student' },
    isVerified: { type: Boolean, default: false },
    otp: { type: String }, // Hashed
    otpExpires: { type: Date },
    lastOtpSent: { type: Date },
}, {
    timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);
