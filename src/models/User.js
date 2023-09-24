import mongoose from "mongoose";

export const UserSchema = mongoose.model("User", {
  email: String,
  password: String,
});
