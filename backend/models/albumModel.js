import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  coverImageUrl: { type: String },
});

export default mongoose.model("Album", albumSchema);
