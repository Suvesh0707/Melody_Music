import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './db/index.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

import songRoutes from './routes/songs.routes.js'
app.use("/api/songs", songRoutes);

import artistRoutes from './routes/artistRoutes.js';
app.use("/api/artist", artistRoutes);


connectDB();


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});