import express from "express";
import multer from "multer";
import { createSong, getSongById, createVisualSongs, getRegularSongs, getVisualSongs, createMarathiSongs, createEnglishSongs, getMarathiSongs, getEnglishSongs, getAllSongs} from "../controllers/songController.js";

const router = express.Router();

const upload = multer();

router.post(
  "/",
  upload.fields([
    { name: "audioFile", maxCount: 10},
    { name: "coverImage", maxCount: 10 },
  ]),
  createSong
);

router.post("/hindi", upload.fields([
  { name: "audioFile", maxCount: 10 },
  { name: "coverImage", maxCount: 10 }
]), createVisualSongs);

router.post("/marathi", upload.fields([
  { name: "audioFile", maxCount: 10 },
  { name: "coverImage", maxCount: 10 }
]), createMarathiSongs);

router.post("/english", upload.fields([
  { name: "audioFile", maxCount: 10 },
  { name: "coverImage", maxCount: 10 }
]), createEnglishSongs);


router.get("/getsongs", getRegularSongs);
router.get("/hindi", getVisualSongs);
router.get("/marathi", getMarathiSongs);
router.get("/english", getEnglishSongs);
router.get("/getallsongs", getAllSongs);


router.get("/:id", getSongById);

export default router;
