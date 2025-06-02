import express from "express";
import multer from "multer";
import { isGithubAdmin } from "../middlewares/isAdminMiddleware.js";
import {
  createSong,
  createVisualSongs,
  createMarathiSongs,
  createEnglishSongs,
} from "../controllers/songController.js";
import { protect } from "../middlewares/protectRoute.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/newly",
  protect,
  isGithubAdmin,
  upload.fields([
    { name: "audioFile", maxCount: 10 },
    { name: "coverImage", maxCount: 10 },
  ]),
  createSong
);

router.post(
  "/hindi",
  protect,
  isGithubAdmin,
  upload.fields([
    { name: "audioFile", maxCount: 10 },
    { name: "coverImage", maxCount: 10 },
  ]),
  createVisualSongs
);

router.post(
  "/marathi",
  protect,
  isGithubAdmin,
  upload.fields([
    { name: "audioFile", maxCount: 10 },
    { name: "coverImage", maxCount: 10 },
  ]),
  createMarathiSongs
);

router.post(
  "/english",
    protect,
  isGithubAdmin,
  upload.fields([
    { name: "audioFile", maxCount: 10 },
    { name: "coverImage", maxCount: 10 },
  ]),
  createEnglishSongs
);

export default router;
