import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image : String,
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    weight: {
        type: String,
        required: true,
        trim: true,
    },
    dimensions: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    reviews: [{ type: "ObjectId", ref: "reviews"}],
}, {
    timestamps: true,
});

const ProductModel = mongoose.model('users', ProductSchema);

export default ProductModel;