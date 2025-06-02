import React, { useState } from "react";
import axios from "axios";

export default function Admin() {
  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [language, setLanguage] = useState("hindi");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!audioFile) {
      setMessage("Please select an audio file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("audioFile", audioFile);
    if (coverFile) formData.append("coverImage", coverFile);

    setLoading(true);
    setMessage("");

    try {
      await axios.post(
        `http://localhost:3000/api/admin/${language}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setMessage("Song uploaded successfully!");
      setAudioFile(null);
      setCoverFile(null);
    } catch (error) {
      setMessage("Upload failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#121212] rounded-3xl p-8 border border-pink-700 shadow-lg">
        <h2 className="text-4xl font-extrabold text-pink-500 mb-8 text-center tracking-wide">
          Upload New Song
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="language"
              className="block mb-2 font-semibold text-pink-400 text-lg"
            >
              Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-[#1f1f1f] text-pink-300 px-4 py-3 rounded-xl border border-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-40 transition"
            >
              <option className="bg-[#121212]" value="hindi">
                Hindi
              </option>
              <option className="bg-[#121212]" value="marathi">
                Marathi
              </option>
              <option className="bg-[#121212]" value="english">
                English
              </option>
              <option className="bg-[#121212]" value="newly">
                Newly Release Songs
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="audioFile"
              className="block mb-2 font-semibold text-pink-400 text-lg"
            >
              Audio File <span className="text-pink-600">*</span>
            </label>
            <input
              id="audioFile"
              type="file"
              accept="audio/*"
              required
              onChange={(e) => setAudioFile(e.target.files[0])}
              className="w-full cursor-pointer rounded-xl border border-pink-700 bg-[#1f1f1f] px-3 py-3 text-pink-300 file:bg-pink-600 file:text-black file:font-semibold file:px-4 file:py-2 file:rounded-lg file:mr-4 hover:file:bg-pink-700 transition focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-40"
            />
          </div>

          <div>
            <label
              htmlFor="coverImage"
              className="block mb-2 font-semibold text-pink-400 text-lg"
            >
              Cover Image (optional)
            </label>
            <input
              id="coverImage"
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files[0])}
              className="w-full cursor-pointer rounded-xl border border-pink-700 bg-[#1f1f1f] px-3 py-3 text-pink-300 file:bg-pink-600 file:text-black file:font-semibold file:px-4 file:py-2 file:rounded-lg file:mr-4 hover:file:bg-pink-700 transition focus:outline-none focus:ring-2 focus:ring-pink-600 focus:ring-opacity-40"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-extrabold text-lg tracking-wide transition
              ${
                loading
                  ? "bg-pink-400 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
              } text-black focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-40`}
          >
            {loading ? "Uploading..." : "Upload Song"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-6 text-center font-semibold text-sm ${
              message.includes("successfully")
                ? "text-green-400"
                : "text-pink-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
