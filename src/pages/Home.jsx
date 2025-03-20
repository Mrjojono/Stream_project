import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import image from "../assets/image (1).jpg";
import image1 from "../assets/image (2).jpg";
import image2 from "../assets/image (3).jpg";
import image3 from "../assets/image (4).jpg";
import image4 from "../assets/image (5).jpg";
import image5 from "../assets/image (6).jpg";
import image6 from "../assets/image (7).jpg";
import image7 from "../assets/image (8).jpg";
import image8 from "../assets/image (9).jpg";
import image9 from "../assets/image (10).jpg";

function Home({ videos, search }) {
  console.log("voila les videos");
  console.log(videos);
  const images = [
    image,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
  ];
  const [index, setIndex] = useState(0);

  /*const [filteredVideos, setFilteredVideos] = useState(videos);
 

  useEffect(() => {
    if (videos && Array.isArray(videos)) {
      const filtered = videos.filter((video) =>
        video.snippet.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos([]);
    }
  }, [search, videos]);
*/

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval); // Nettoie l'intervalle au démontage
  }, [images.length]);

  return (
    <div className="text-center mb-20 mt-10 p-20  flex gap-8 flex-wrap flex-row min-h-screen  border-none">
      {/* Section d'accueil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      className="accueil"
      >
        <div >
          <div className="mt-4 mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to Anime Streaming
            </h1>
            <p className="text-lg text-gray-300">
              Stream your favorite anime shows and movies
            </p>
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 animate-bounce">
              Get Started
            </button>
          </div>
          <div className="flex flex-col w-full h-[600px] overflow-hidden items-center">
          <motion.img
                key={index} // Permet de réinitialiser l'animation à chaque changement d'image
                src={images[index]}
                alt="anime"
                className="w-full max-w-full h-full object-cover rounded-lg shadow-lg"
                initial={{ opacity: 0 }} // Image commence invisible
                animate={{ opacity: 1 }} // Animation de fondu en entrée
                exit={{ opacity: 1 }} // Animation de fondu en sortie
                transition={{ duration: 1.5 }} // Durée de l'effet (1.5s ici)
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
