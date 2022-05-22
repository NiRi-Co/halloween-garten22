import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        default: "user"
    },
    hash: String,
    salt: String
});

export default mongoose.model('User', UserSchema);