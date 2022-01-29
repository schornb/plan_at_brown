import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    oath_id: String
});

export interface IUser extends Document {
    name: string;
    email: string;
    oath_id: string;
}

export const User = mongoose.model('User', UserSchema);