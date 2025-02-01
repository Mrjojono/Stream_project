import React from 'react';
import image from '../assets/image.png';
import { Link } from 'react-router-dom';
import wall from '../assets/wall.jpg';
import getVideoList from '../api/VideoApi';
import { useEffect, useState } from 'react';

function Home() {
  const [videos, setVideos] = useState([]);

  // Utilisation de useEffect pour récupérer les données des vidéos
  useEffect(() => {
    async function fetchVideos() {
      try {
        const videoList = await getVideoList("son go ku");
        setVideos(videoList.data); // Assurez-vous que videoList.data contient les données
      } catch (error) {
        console.error("Erreur lors de la récupération des vidéos :", error);
      }
    }

    fetchVideos();
  }, []);

  console.log(videos); // Vérifiez les données dans la console

  return (
    <div className='info'>
      <div className="text-center mb-12 bg-gradient-to-r bg-gray-400 rounded-2xl flex gap-2 flex-wrap flex-row min-h-screen p-2 border-none ">
        {/* Section d'accueil */}
        <div className="bg-black/60 border-2 border-violet-950 shadow-inner p-5 rounded-lg m-4">
          <div className='mt-4 mb-4'>
            <h1 className="text-4xl font-bold text-white mb-4">Welcome to Anime Streaming</h1>
            <p className="text-lg text-gray-300">Stream your favorite anime shows and movies</p>
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
              Get Started
            </button>
          </div>
          <div className='flex flex-col gap-4'>
          <img src={wall} alt="anime" className="w-[500px] h-[600px] object-cover rounded-lg" />
          <img src={wall} alt="anime" className="w-[500px] h-[600px] object-cover rounded-lg" />
          </div>
          
        </div>

        {/* Cartes des animes */}
        <div className='flex flex-wrap h-auto flex-1'>
        {videos.length > 0 ? (
          videos.map((anime) => (
            <div key={anime.mal_id} className='card'>
              <img
                src={anime.images.jpg.image_url}
                alt={anime.title}
                className="w-full h-[150px] object-cover"
              />
              <h1 className='text-white text-start'>{anime.title}</h1>
              
              <button className='bg-blue-600 shadow-sm rounded-2xl p-2 text-white text-1xl mb-0'>
                <Link to="/Stream">Watch</Link>
              </button>
            </div>
          ))
        ) : (
          <p>Loading...</p> // Affichez un message de chargement si les données ne sont pas encore disponibles
        )}
        </div>
        
      </div>


    </div>
  );
}

export default Home;