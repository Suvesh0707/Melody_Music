import express from "express";
import { upload } from "../utils/multer.js";
import { createOrUpdateArtist, getAllArtists} from "../controllers/songController.js";

const router = express.Router();

router.post("/", upload.fields([{ name: "profilePhoto", maxCount: 1 }]), createOrUpdateArtist);
router.get("/", getAllArtists);

export default router;
