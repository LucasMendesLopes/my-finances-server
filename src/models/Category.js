import mongoose from "mongoose";

export const CategorySchema = mongoose.model("Category", {
    name: String,
    color: String,
    type: String,
    userId: String,
});
