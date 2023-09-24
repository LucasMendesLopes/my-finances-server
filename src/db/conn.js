import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config();

const { DB_USER, DB_PASS } = process.env;

export async function conn() {
  try {
    await connect(
      `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.ktqjnpw.mongodb.net/my-finances?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.log("error :>> ", error);
  }
}
