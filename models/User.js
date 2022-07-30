import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lasttName: {
        type: String,
        required: true,
        trim: true,
    },
    profilePicture : String,
    gender: {
        type: String,
        required: true,
        trim: true,
        enum: ["male", "female"],
    },
    birthDate: {
        type: Date,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique:true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;