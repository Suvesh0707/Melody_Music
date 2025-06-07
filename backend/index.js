import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './db/index.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js'; 
import './config/google.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://suvesh-music-melody.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use(session({
  secret: "secretsessionkey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  },
}));

app.use(passport.initialize());
app.use(passport.session());


import userRoutes from './routes/userRoutes.js';
app.use('/auth', userRoutes);


import songRoutes from './routes/songs.routes.js'
app.use("/api/songs", songRoutes);

import artistRoutes from './routes/artistRoutes.js';
app.use("/api/artist", artistRoutes);

import adminRoutes from './routes/adminRoutes.js';
app.use('/api/admin', adminRoutes);

import magicRoutes from './routes/magicRoutes.js'
app.use("/auth", magicRoutes)



connectDB();


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});