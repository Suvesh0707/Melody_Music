import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";

function Navbar() {
  const { user, setUser, loading } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const adminGitHubIds = import.meta.env.VITE_ADMIN_GITHUB_IDS
    ? import.meta.env.VITE_ADMIN_GITHUB_IDS.split(",")
    : [];

  const isAdmin = user && adminGitHubIds.includes(user.githubId);

  const handleLoginLogout = async () => {
    if (user) {
      try {
        await axios.get("https://musicmelody.onrender.com/auth/logout", {
          withCredentials: true,
        });
        setUser(null);
        navigate("/");
      } catch (error) {
        console.error("Logout failed", error);
      }
    } else {
      navigate("/login");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/aftersearch?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  if (loading) return null;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent mt-3">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 mt-6">

        {/* MOBILE VIEW: Hide logo and nav links, show search left, user right */}
        <div className="flex w-full sm:hidden items-center justify-between gap-4">
          {/* Search bar full width on mobile */}
          <input
            type="text"
            placeholder="Search songs, artists..."
            className="flex-1 px-3 py-2 text-sm bg-black bg-opacity-40 backdrop-blur-md text-white rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {/* User info + login/logout */}
          <div className="flex items-center gap-3">
            {user && (
              <img
                src={user.avatarUrl || "user.png"}
                alt={user.username}
                className="w-8 h-8 rounded-full"
                title={user.displayName || user.username}
              />
            )}
            <button
              onClick={handleLoginLogout}
              className="px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded text-white font-semibold transition cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>

        {/* DESKTOP VIEW: Logo + nav links + search bar + user info */}
        <div className="hidden sm:flex flex-1 items-center justify-between gap-6">
          {/* Left side: Logo + search */}
          <div className="flex items-center gap-4">
            <img
              src="logo2.jpg"
              alt="Logo"
              className="h-10 w-auto rounded-full"
            />
            <input
              type="text"
              placeholder="Search songs, artists..."
              className="px-4 py-2 bg-black bg-opacity-40 backdrop-blur-md text-white rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-500 max-w-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Center: Nav links */}
          <ul className="flex space-x-6 font-semibold">
            <li className="hover:text-pink-500 cursor-pointer">
              <Link
                to="/"
                className="text-white hover:text-pink-500 text-lg font-bold"
              >
                Home
              </Link>
            </li>
            <li className="hover:text-pink-500 cursor-pointer">
              <a
                href="#aboutus"
                className="text-white text-lg font-bold hover:text-pink-500 transition"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("aboutus")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                About
              </a>
            </li>
            <li className="hover:text-pink-500 cursor-pointer">
              <Link
                to="/contact"
                className="text-white hover:text-pink-500 text-lg font-bold"
              >
                Contact
              </Link>
            </li>
            {isAdmin && (
              <li className="hover:text-pink-400 cursor-pointer">
                <Link
                  to="/admin"
                  className="text-pink-400 hover:text-pink-300 text-lg font-bold"
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>

          {/* Right side: User info + login/logout */}
          <div className="flex items-center gap-4">
            {user && (
              <>
                <img
                  src={user.avatarUrl || "user.png"}
                  alt={user.username}
                  className="w-8 h-8 rounded-full"
                  title={user.displayName || user.username}
                />
                <span className="text-white font-semibold truncate max-w-[100px]">
                  {user.displayName || user.username}
                </span>
              </>
            )}
            <button
              onClick={handleLoginLogout}
              className="px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded text-white font-semibold transition cursor-pointer shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
