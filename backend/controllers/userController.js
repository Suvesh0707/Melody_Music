import User from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

export const githubCallback = async (req, res) => {
  try {
    const user = req.user; 
    const token = generateToken(user); 
    console.log('Generated token:', token);

    res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 10 * 24 * 60 * 60 * 1000,
});


    res.redirect("http://localhost:5173/");
  } catch (err) {
    console.error('GitHub Callback Error:', err);
    res.status(500).json({ error: 'Authentication failed' });
  }
};



export const getMe = (req, res) => {
  if (!req.user) return res.status(404).json({ error: 'User not found' });
  res.status(200).json(req.user);
};

export const logoutUser = (req, res) => {
   req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    res.status(200).json({ message: "Logged out successfully" });
  });
};