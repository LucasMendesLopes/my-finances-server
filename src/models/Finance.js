import mongoose from "mongoose";

export const FinanceSchema = mongoose.model("Finance", {
  date: Number,
  description: String,
  type: String,
  value: Number,
  userId: String,
});
