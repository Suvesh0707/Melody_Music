import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [audioFile, setaudioFile] = useState([]);
  const [coverFile, setCoverFile] = useState(null);
  const [language, setLanguage] = useState("hindi");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (audioFile.length === 0) {
      setMessage("Please select at least one audio file.");
      return;
    }

    const formData = new FormData();
    audioFile.forEach((file) => {
      formData.append("audioFile", file); 
    });
    if (coverFile) formData.append("coverImage", coverFile);

    setLoading(true);
    setMessage("");

    try {
      await axios.post(
        `https://musicmelody.onrender.com/api/admin/${language}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setMessage("Songs uploaded successfully!");
      setaudioFile([]);
      setCoverFile(null);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Upload failed. Please try again."
      );
    }

    setLoading(false);
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 mt-9">
      <div className="w-full max-w-md rounded-3xl p-8 border border-pink-700 shadow-lg">
        <h2 className="text-4xl font-extrabold text-pink-500 mb-8 text-center tracking-wide">
          Upload New Songs
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
              Audio Files <span className="text-pink-600">*</span>
            </label>
            <input
              id="audioFile"
              type="file"
              accept="audio/*"
              multiple
              required
              onChange={(e) => setaudioFile(Array.from(e.target.files))}
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
            className={`w-full py-4 rounded-2xl font-extrabold text-lg tracking-wide transition cursor-pointer
              ${
                loading
                  ? "bg-pink-400 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
              } text-black focus:outline-none focus:ring-4 focus:ring-pink-500 focus:ring-opacity-40`}
          >
            {loading ? "Uploading..." : "Upload Songs"}
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
    </>
  );
}
