import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },


    artist: { type: String, required: true },  

    album: { type: String }, 

    artistName: { type: String }, 

    genre: { type: String },

    releaseYear: { type: Number },  

    copyright: { type: String }, 

    audioUrl: { type: String, required: true },

    coverImageUrl: { type: String },

    duration: { type: Number, default: 0 },

    createdBy: { type: String },

    playCount: { type: Number, default: 0 },

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isVisual: { type: Boolean, default: false },
    language: {
  type: String,
  enum: ["English", "Marathi", "Other"],
  default: "Other",
},


  },
  { timestamps: true }
);

export default mongoose.model("Song", songSchema);
