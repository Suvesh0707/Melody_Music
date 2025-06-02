import Song from "../models/songModel.js";
import Artist from "../models/artistModel.js";
import Album from "../models/albumModel.js";
import cloudinary from "../config/cloudinary.js";
import { parseBuffer } from "music-metadata";

const uploadToCloudinary = (buffer, folder, resourceType = "auto") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};


export const createOrUpdateArtist = async (req, res) => {
  try {
    const { name, bio } = req.body;
    if (!name) return res.status(400).json({ error: "Artist name is required" });

    let artist = await Artist.findOne({ name: name.trim() });
    let imageUrl = artist?.imageUrl || "";

    if (req.files && req.files.profilePhoto && req.files.profilePhoto.length > 0) {
      const uploadResult = await uploadToCloudinary(req.files.profilePhoto[0].buffer, "artists/profilePhotos", "image");
      imageUrl = uploadResult.secure_url;
    }

    if (artist) {
      artist.bio = bio || artist.bio;
      artist.imageUrl = imageUrl;
      await artist.save();
    } else {
      artist = new Artist({
        name: name.trim(),
        bio,
        imageUrl,
      });
      await artist.save();
    }

    res.status(201).json(artist);
  } catch (error) {
    console.error("Error in createOrUpdateArtist:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (error) {
    console.error("Error fetching artists:", error);
    res.status(500).json({ error: error.message });
  }
};

const getOrCreateAlbum = async (name) => {
  if (!name) return null;
  let album = await Album.findOne({ name });
  if (!album) album = await Album.create({ name });
  return album._id;
};

const getOrCreateArtist = async (name) => {
  if (!name) return null;
  let artist = await Artist.findOne({ name: name.trim() });
  if (!artist) artist = await Artist.create({ name: name.trim() });
  return artist._id;
};


export const createSong = async (req, res) => {
  try {
    const audioFiles = req.files.audioFile || [];
    const coverImages = req.files.coverImage || [];

    if (audioFiles.length === 0) {
      return res.status(400).json({ error: "At least one audio file is required" });
    }
    if (audioFiles.length > 10) {
      return res.status(400).json({ error: "Maximum 10 audio files allowed" });
    }

    const createdSongs = [];

    for (let i = 0; i < audioFiles.length; i++) {
      const audioFile = audioFiles[i];
      const coverImageFile = coverImages[i]; // might be undefined

      // Extract metadata
      const meta = await parseBuffer(audioFile.buffer, "audio/mpeg");

      const title = meta.common.title || req.body.title || `Untitled ${i + 1}`;
      const genre = (meta.common.genre && meta.common.genre[0]) || req.body.genre || "Unknown";
      const duration = meta.format.duration ? Math.floor(meta.format.duration) : 0;
      const artistName = meta.common.albumartist || req.body.artistName || "Unknown Artist";
      const albumName = meta.common.album || req.body.albumName || "Unknown Album";
      const releaseYear = meta.common.year || (meta.common.date ? new Date(meta.common.date).getFullYear() : null);
      const copyright = meta.common.copyright || "";

      const audioUpload = await uploadToCloudinary(audioFile.buffer, "songs/audio", "video");

      let coverImageUrl = "";

      if (coverImageFile) {
        const coverUpload = await uploadToCloudinary(coverImageFile.buffer, "songs/covers", "image");
        coverImageUrl = coverUpload.secure_url;
      } else if (meta.common.picture && meta.common.picture.length > 0) {
        const picture = meta.common.picture[0];
        const imageBuffer = picture.data;

        const coverUpload = await uploadToCloudinary(imageBuffer, "songs/covers", "image");
        coverImageUrl = coverUpload.secure_url;
      }

      const artistId = await getOrCreateArtist(artistName);
      const albumId = await getOrCreateAlbum(albumName);

      const song = new Song({
        title,
        genre,
        duration,
        artist: artistId,
        album: albumId,
        createdBy: req.body.createdBy || null,
        audioUrl: audioUpload.secure_url,
        coverImageUrl,
        releaseYear,
        copyright,
        artistName,
        isVisual: false, // regular songs
      });

      await song.save();
      createdSongs.push(song);
    }

    res.status(201).json({ createdSongs });
  } catch (error) {
    console.error("Error in createSong:", error);
    res.status(500).json({ error: error.message });
  }
};



export const getRegularSongs = async (req, res) => {
  try {
    const songs = await Song.find({ isVisual: false });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVisualSongs = async (req, res) => {
  try {
    const songs = await Song.find({ isVisual: true });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate("artist album likes");
    if (!song) return res.status(404).json({ error: "Song not found" });
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createVisualSongs = async (req, res) => {
  try {
    const audioFiles = req.files.audioFile || [];
    const coverImages = req.files.coverImage || [];

    if (audioFiles.length === 0) {
      return res.status(400).json({ error: "At least one audio file is required" });
    }

    const createdSongs = [];

    for (let i = 0; i < audioFiles.length; i++) {
      const audioFile = audioFiles[i];
      const coverImageFile = coverImages[i]; // may be undefined if not provided

      // Extract metadata
      const meta = await parseBuffer(audioFile.buffer, "audio/mpeg");

      const title = meta.common.title || req.body.title || `Untitled ${i + 1}`;
      const genre = (meta.common.genre && meta.common.genre[0]) || req.body.genre || "Unknown";
      const duration = meta.format.duration ? Math.floor(meta.format.duration) : 0;
      const artistName = meta.common.albumartist || req.body.artistName || "Unknown Artist";
      const albumName = meta.common.album || req.body.albumName || "Unknown Album";
      const releaseYear = meta.common.year || (meta.common.date ? new Date(meta.common.date).getFullYear() : null);
      const copyright = meta.common.copyright || "";

      const audioUpload = await uploadToCloudinary(audioFile.buffer, "songs/audio", "video");

      let coverImageUrl = "";

      if (coverImageFile) {
        const coverUpload = await uploadToCloudinary(coverImageFile.buffer, "songs/covers", "image");
        coverImageUrl = coverUpload.secure_url;
      } else if (meta.common.picture && meta.common.picture.length > 0) {
        const picture = meta.common.picture[0];
        const imageBuffer = picture.data;

        const coverUpload = await uploadToCloudinary(imageBuffer, "songs/covers", "image");
        coverImageUrl = coverUpload.secure_url;
      }

      const artistId = await getOrCreateArtist(artistName);
      const albumId = await getOrCreateAlbum(albumName);

      const song = new Song({
        title,
        genre,
        duration,
        artist: artistId,
        album: albumId,
        createdBy: req.body.createdBy || null,
        audioUrl: audioUpload.secure_url,
        coverImageUrl,
        releaseYear,
        copyright,
        artistName,
        isVisual: true,
      });

      await song.save();
      createdSongs.push(song);
    }

    res.status(201).json({ createdSongs });
  } catch (error) {
    console.error("Error in createVisualSongs:", error);
    res.status(500).json({ error: error.message });
  }
};

export const createMarathiSongs = async (req, res) => {
  try {
    const audioFiles = req.files.audioFile || [];
    const coverImages = req.files.coverImage || [];

    if (audioFiles.length === 0) {
      return res.status(400).json({ error: "At least one audio file is required" });
    }
    if (audioFiles.length > 10) {
      return res.status(400).json({ error: "Maximum 10 audio files allowed" });
    }

    const createdSongs = [];

    for (let i = 0; i < audioFiles.length; i++) {
      const audioFile = audioFiles[i];
      const coverImageFile = coverImages[i];

      const meta = await parseBuffer(audioFile.buffer, "audio/mpeg");

      const title = meta.common.title || req.body.title || `Untitled ${i + 1}`;
      const genre = (meta.common.genre && meta.common.genre[0]) || req.body.genre || "Unknown";
      const duration = meta.format.duration ? Math.floor(meta.format.duration) : 0;
      const artistName = meta.common.albumartist || req.body.artistName || "Unknown Artist";
      const albumName = meta.common.album || req.body.albumName || "Unknown Album";
      const releaseYear = meta.common.year || (meta.common.date ? new Date(meta.common.date).getFullYear() : null);
      const copyright = meta.common.copyright || "";

      const audioUpload = await uploadToCloudinary(audioFile.buffer, "songs/audio", "video");

      let coverImageUrl = "";

      if (coverImageFile) {
        const coverUpload = await uploadToCloudinary(coverImageFile.buffer, "songs/covers", "image");
        coverImageUrl = coverUpload.secure_url;
      } else if (meta.common.picture && meta.common.picture.length > 0) {
        const picture = meta.common.picture[0];
        const imageBuffer = picture.data;

        const coverUpload = await uploadToCloudinary(imageBuffer, "songs/covers", "image");
        coverImageUrl = coverUpload.secure_url;
      }

      const artistId = await getOrCreateArtist(artistName);
      const albumId = await getOrCreateAlbum(albumName);

      const song = new Song({
        title,
        genre,
        duration,
        artist: artistId,
        album: albumId,
        createdBy: req.body.createdBy || null,
        audioUrl: audioUpload.secure_url,
        coverImageUrl,
        releaseYear,
        copyright,
        artistName,
        isVisual: false,
        language: "Marathi",
      });

      await song.save();
      createdSongs.push(song);
    }

    res.status(201).json({ createdSongs });
  } catch (error) {
    console.error("Error in createMarathiSongs:", error);
    res.status(500).json({ error: error.message });
  }
};


export const createEnglishSongs = async (req, res) => {
  try {
    const audioFiles = req.files.audioFile || [];
    const coverImages = req.files.coverImage || [];

    if (audioFiles.length === 0) {
      return res.status(400).json({ error: "At least one audio file is required" });
    }
    if (audioFiles.length > 10) {
      return res.status(400).json({ error: "Maximum 10 audio files allowed" });
    }

    const createdSongs = [];

    for (let i = 0; i < audioFiles.length; i++) {
      const audioFile = audioFiles[i];
      const coverImageFile = coverImages[i];

      const meta = await parseBuffer(audioFile.buffer, "audio/mpeg");

      const title = meta.common.title || req.body.title || `Untitled ${i + 1}`;
      const genre = (meta.common.genre && meta.common.genre[0]) || req.body.genre || "Unknown";
      const duration = meta.format.duration ? Math.floor(meta.format.duration) : 0;
      const artistName = meta.common.albumartist || req.body.artistName || "Unknown Artist";
      const albumName = meta.common.album || req.body.albumName || "Unknown Album";
      const releaseYear = meta.common.year || (meta.common.date ? new Date(meta.common.date).getFullYear() : null);
      const copyright = meta.common.copyright || "";

      const audioUpload = await uploadToCloudinary(audioFile.buffer, "songs/audio", "video");

      let coverImageUrl = "";

      if (coverImageFile) {
        const coverUpload = await uploadToCloudinary(coverImageFile.buffer, "songs/covers", "image");
        coverImageUrl = coverUpload.secure_url;
      } else if (meta.common.picture && meta.common.picture.length > 0) {
        const picture = meta.common.picture[0];
        const imageBuffer = picture.data;

        const coverUpload = await uploadToCloudinary(imageBuffer, "songs/covers", "image");
        coverImageUrl = coverUpload.secure_url;
      }

      const artistId = await getOrCreateArtist(artistName);
      const albumId = await getOrCreateAlbum(albumName);

      const song = new Song({
        title,
        genre,
        duration,
        artist: artistId,
        album: albumId,
        createdBy: req.body.createdBy || null,
        audioUrl: audioUpload.secure_url,
        coverImageUrl,
        releaseYear,
        copyright,
        artistName,
        isVisual: false,
        language: "English",
      });

      await song.save();
      createdSongs.push(song);
    }

    res.status(201).json({ createdSongs });
  } catch (error) {
    console.error("Error in createMarathiSongs:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getMarathiSongs = async (req, res) => {
  try {
    const songs = await Song.find({ language: "Marathi" });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnglishSongs = async (req, res) => {
  try {
    const songs = await Song.find({ language: "English" });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllSongs = async (req, res) => {
  try {
    let search = req.query.search || "";
    search = search.trim();

    if (!search) {
      const songs = await Song.find();
      return res.status(200).json({ success: true, songs });
    }
    const words = search.split(/\s+/);
    const regexes = words.map(word => new RegExp(word, "i"));
    const filter = {
      $or: [
        ...regexes.map(regex => ({ title: regex })),
        ...regexes.map(regex => ({ artist: regex })),
      ],
    };

    const songs = await Song.find(filter).limit(50);

    res.status(200).json({ success: true, songs });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({ success: false, message: "Failed to fetch songs" });
  }
};





