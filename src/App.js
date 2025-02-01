import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './pages/Home';
import Register from './components/Register';
import Header from './components/header';
import Stream from './pages/Stream';
import getVideoList from './api/VideoApi';
import '@fortawesome/fontawesome-free/css/all.min.css';

const login = true;

function App() {
  // Déplacement des hooks à l'intérieur du composant App
  const [videos, setVideos] = useState([]);

  // Utilisation de useEffect pour récupérer les données des vidéos
  useEffect(() => {
    async function fetchVideos() {
      try {
        const videoList = await getVideoList();
        setVideos(videoList.data); 
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos :", error);
      }
    }

    fetchVideos();
  }, []);

  console.log(videos);

  return (
    <Router>
      <Layout login={login} videos={videos} />
    </Router>
  );
}

function Layout({ login, videos }) {
  const location = useLocation();
  const showHeader = location.pathname === "/" || location.pathname === "/Stream";

  const { videoData } = location.state || {}; // On récupère la donnée passée via state

  return (
    <>
      {showHeader && <Header login={login} />}
      <Routes>
        <Route path="/" element={<Home videos={videos} />} />
        <Route path="/Stream" element={<Stream data = {videoData} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
