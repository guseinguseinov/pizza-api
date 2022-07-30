import mongoose from "mongoose";


const ReviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: "ObjectId",
        ref: "users",
    }
   
}, {
    timestamps: true,
});

const ReviewModel = mongoose.model('users', ReviewSchema);

export default ReviewModel;