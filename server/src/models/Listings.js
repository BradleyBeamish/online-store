import mongoose from "mongoose";

const listingsSchema = mongoose.Schema(
    {
        _userID: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const ListingsModel = mongoose.model("listings", listingsSchema);
