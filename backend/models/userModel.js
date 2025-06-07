import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  githubId: { type: String, unique: true, sparse: true },
  googleId: { type: String, unique: true, sparse: true }, 
  username: String,
  email: String,
  displayName: String,
  avatarUrl: String,
  githubUrl: String,
  bio: String,
  location: String,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
export default User;
