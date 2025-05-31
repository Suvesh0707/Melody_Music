import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
   imageUrl: { type: String },
  bio: { type: String },
});

export default mongoose.model("Artist", artistSchema);
