import mongoose from "mongoose";

const FinanceSchema = new mongoose.Schema({
  date: { type: Number, required: true },
  description: { type: String, required: true },
  category: {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String, required: true },
    type: { type: String, required: true },
    userId: { type: String, required: true },
  },
  value: { type: Number, required: true },
  userId: { type: String, required: true },
});

export const Finance = mongoose.model("Finance", FinanceSchema);

