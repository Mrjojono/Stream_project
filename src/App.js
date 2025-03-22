import React, {  useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./pages/Home";
import Register from "./components/Register";
import Header from "./components/header";
import Profil from "./pages/Profil";
import Footer from "./components/Footer";
import Stream from "./pages/Stream";
import AnimeStream from "./pages/AnimeStream";
import Movie from "./pages/movies";
import Anime from "./pages/Anime";
import { getVideoList, searchAnime, getAnime } from "./api/VideoApi";

function App() {
  const [videos, setVideos] = useState([]);
  const [movies,setMovies] = useState([]);
  const [series,setSeries] = useState([]);
  const [anime,setAnime] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fonction pour mettre à jour l'état de connexion
  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  // Récupérer les vidéos initiales
  useEffect(() => {
    async function fetchVideos() {
      try {
        const videoList = await getVideoList();
        console.log(videoList.items);
        setVideos(videoList.items);
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos :", error);
      }
    }
    fetchVideos();
  }, []);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const movieList = await getVideoList("movie");
        setMovies(movieList.items);
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos :", error);
      }
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const AnimeList = await getAnime();
        setAnime(AnimeList);
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos :", error);
      }
    }
    fetchAnime();
  }, []);


  useEffect(() => {
    async function fetchSeries() {
      try {
        const serieList = await getVideoList("serie");
        setSeries(serieList.items);
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos :", error);
      }
    }
    fetchSeries();
  }, []);

  
  // Récupérer les vidéos en fonction de la recherche
  useEffect(() => {
    async function fetchVideosonsearch() {
      try {
        const videoList = await searchAnime(searchTerm);
        setVideos(videoList.items); 
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos :", error);
      }
    }

    if (searchTerm) {
      fetchVideosonsearch(); 
    } else {
      // Si aucune recherche, recharger toutes les vidéos
      async function reloadVideos() {
        const videoList = await getVideoList();
        setVideos(videoList.items);
      }
      reloadVideos();
    }
  }, [searchTerm]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
        console.log("User is authenticated");
    } else {
        console.log("User is not authenticated");
    }
}, []);



  return (
    <Router>
      <Layout
        login={isLoggedIn}
        movies={movies}
        videos={videos}
        series = {series}
        anime = {anime}
        onLogin={handleLogin}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </Router>
  );
}

function Layout({ login, videos, movies, anime, series, onLogin, searchTerm, setSearchTerm }) {
  const location = useLocation();
  const showHeader =
    location.pathname === "/" ||
    location.pathname === "/Stream" ||
    location.pathname === "/Profil" ||
    location.pathname === "/Movies" ||
    location.pathname === "/Series"||
    location.pathname === "/Anime"  ||
    location.pathname === "/Animes" ||
    location.pathname === "/AnimeStream";
  const showFooter =
    location.pathname === "/" ||
    location.pathname === "/Stream" ||
    location.pathname === "/Profil";

  return (
    <>
      {showHeader && (
        <Header
          login={login}
          onLogin={onLogin}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
      <Routes>
        <Route path="/" element={<Home videos={anime} search={searchTerm} />} />
        <Route path="/Stream" element={<Stream />} />
        <Route path="/AnimeStream" element={<AnimeStream />} />
        <Route path="/login" element={<LoginForm onLogin={onLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/Movies" element={<Movie  videos={movies} search={searchTerm}/>} />
        <Route path="/Series" element={<Movie  videos={series} search={searchTerm}/>} />
        <Route path="/Anime" element={<Movie videos={videos} search={searchTerm} />} />
        <Route path="/Animes" element={<Anime videos={anime} search={searchTerm} />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

export default App;
