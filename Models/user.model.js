import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  work_email: { type: String, required: true },
  company_name: { type: String, required: true },
  contact: { type: String, required: true },
  message: { type: String },
  password: { type: String, required: true },
});


export const validate_users =  mongoose.model("validate_users", UserSchema);
export const users =  mongoose.model("users", UserSchema);
