import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  token: { type: String }, // optional JWT or session token
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("User", userSchema);