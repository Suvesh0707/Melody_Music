# Melody_Music

Melody_Music is a full-stack music player application with a **Node.js backend** and a **React frontend**. It fetches songs from multiple APIs (organized by language/genre), allows seamless audio playback, and ensures only one API's songs are active at any time.

---

## Features

- **Backend (Node.js + Express)**  
  - REST APIs serving songs by language or genre  
  - Provides song metadata including title, artist, genre, audio URLs, and cover images  
  - Easily extendable for new languages or categories

- **Frontend (React + Context API)**  
  - Fetches songs from different backend API endpoints  
  - Plays songs with global audio state management  
  - Prevents multiple audio sources playing simultaneously  
  - Responsive UI with playback controls and loading states

---

## Technologies Used

- **Backend:**  
  - Node.js  
  - Express  
  - MongoDB (or any DB you use for storing songs)  
  - CORS  

- **Frontend:**  
  - React 18+  
  - Axios  
  - React Context API  
  - Tailwind CSS  
  - Lucide-react (icons)

---

## Getting Started

### Backend Setup

1. Navigate to backend folder:

   ```bash
   cd backend
