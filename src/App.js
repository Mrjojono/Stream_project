import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { UserProvider } from "./components/userContext";
import Home from "./pages/Home";
import Register from "./components/Register";
import Header from "./components/header";
import Profil from "./pages/Profil";
import Footer from "./components/Footer";
import Stream from "./pages/Stream";
import AnimeStream from "./pages/AnimeStream";
import MovieStream from "./pages/MovieStream";
import Movie from "./pages/movies";
import Movies from "./pages/Movie";
import Anime from "./pages/Anime";
import {
  getVideoList,
  searchAnime,
  getAnime,
  getPictures,
  getMovies,
} from "./api/VideoApi";

function App() {
  const [videos, setVideos] = useState([]);
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [anime, setAnime] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pages, setPages] = useState(0);

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
       // const movieList = await getVideoList("movie");
       const movieList = await getMovies(pages);
        setMovies(movieList.results);
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos :", error);
      }
    }
    fetchMovies();
  }, [pages]);

  useEffect(() => {
    async function fetchAnime() {
      try {
        const AnimeList = await getAnime(pages);

        setAnime(AnimeList);
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos :", error);
      }
    }
    fetchAnime();
  }, [pages]);

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

  useEffect(() => {
    async function fetchPictures() {
      try {
        const PicutureList = await getPictures();
        setPictures(PicutureList);
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos :", error);
      }
    }
    fetchPictures();
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
    <UserProvider>
      <Router>
        <Layout
          login={isLoggedIn}
          movies={movies}
          videos={videos}
          series={series}
          anime={anime}
          pictures={pictures}
          onLogin={handleLogin}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setPages={setPages}
          pages={pages}
        />
      </Router>
    </UserProvider>
  );
}

function Layout({
  login,
  videos,
  movies,
  anime,
  series,
  pictures,
  onLogin,
  searchTerm,
  setSearchTerm,
  setPages,
  pages,
}) {
  const location = useLocation();
  const showHeader =
    location.pathname === "/" ||
    location.pathname === "/Stream" ||
    location.pathname === "/Profil" ||
    location.pathname === "/Movies" ||
    location.pathname === "/Series" ||
    location.pathname === "/Anime" ||
    location.pathname === "/Animes" ||
    location.pathname === "/AnimeStream" ||
    location.pathname === "/MovieStream";
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
        <Route
          path="/"
          element={
            <Home videos={anime} pictures={pictures} search={searchTerm} />
          }
        />
        <Route path="/Stream" element={<Stream />} />
        <Route path="/AnimeStream" element={<AnimeStream />} />
        <Route path="/MovieStream" element={<MovieStream />} />
        <Route path="/login" element={<LoginForm onLogin={onLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Profil" element={<Profil />} />
       {/**
        * <Route   path="/Movies" element={<Movie videos={movies} search={searchTerm} />}/> */ } 
        <Route
          path="/Series"
          element={<Movie videos={series} search={searchTerm} />}
        />
        <Route
          path="/Anime"
          element={
            <Movie videos={videos} search={searchTerm} setPages={setPages} />
          }
        />
        <Route
          path="/Animes"
          element={
            <Anime videos={anime} search={searchTerm} setPages={setPages} />
          }
        />
        <Route
        path="/Movies"
        element={
          <Movies videos={movies} search={searchTerm} setPages={setPages} />
        }
      />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

export default App;
