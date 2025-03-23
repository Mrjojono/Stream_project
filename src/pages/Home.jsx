import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
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

function Home({ videos, search, pictures }) {
  const location = useLocation();
  const user = location.state || {};

  const images2 = pictures.map((picture) => ({
    image: picture.images.jpg.image_url,
    url: picture.url,
  }));

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
  const [index2, setIndex2] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval); // Nettoie l'intervalle au démontage
  }, [images.length]);

  useEffect(() => {
    if (images2.length > 0) {
      const interval = setInterval(() => {
        setIndex2((prevIndex) => (prevIndex + 1) % images2.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [pictures]);

  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const [filteredVideos, setFilteredVideos] = useState(videos);

  useEffect(() => {
    if (videos && Array.isArray(videos)) {
      const filtered = videos.filter((video) =>
        video.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos([]);
    }
  }, [search, videos]);

  return (
    <div className="text-center mb-20 mt-10 p-20  flex gap-8 flex-wrap flex-row min-h-screen  border-none">
      {/* Section d'accueil */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="accueil"
      >
        <div>
          <div className="mt-4 mb-8">
            {user ? (
              <h1 className="text-4xl text-white">Welcome {user.NOM}</h1>
            ) : (
              <h1 className="text-4xl font-bold text-white mb-4">
                Welcome to Anime Streaming
              </h1>
            )}

            <p className="text-lg text-gray-300">
              Stream your favorite anime shows and movies
            </p>
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 animate-bounce">
              Get Started
            </button>
          </div>
          <div className="flex flex-col w-full h-[600px] overflow-hidden items-center">
            <motion.img
              key={index}
              src={images[index]}
              alt="anime"
              className="w-full max-w-full h-full object-cover rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            />
          </div>
        </div>
      </motion.div>
      <div className="flex flex-row   h-[80%] gap-2 w-full ">
        <div className="relative p-5">
          <div className="w-[450px]">
            {images2.length > 0 && (
              <a
                href={images2[index2].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.img
                  key={index}
                  src={images2[index2].image}
                  alt="anime"
                  className="relative h-[800px] shadow-violet-900 shadow-2xl rounded-3xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                  transition={{ duration: 1.5 }}
                  whileHover={{ scale: 1.1 }}
                />
              </a>
            )}
          </div>
        </div>

        <div className=" w-[70%] p-10 flex flex-wrap  inset-0 rounded-3xl bg-black/20 backdrop:blur-2xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-6 mb-5 justify-center w-full"
          >
            {filteredVideos.length > 0 ? (
              filteredVideos.slice(0, 6).map((video) => (
                <motion.div
                  key={video.title}
                  variants={cardVariants}
                  className="card bg-black/60 border-2 border-violet-950 rounded-lg shadow-lg hover:shadow-violet-900/50 transition-shadow duration-300 w-full sm:w-[300px] p-4"
                >
                  <img
                    src={video.thumbnail_url}
                    alt={video.title}
                    className="w-full h-[200px] object-cover rounded-lg"
                  />
                  <h1 className="text-white text-xl font-bold mt-4">
                    {video.title.slice(0, 20)}...
                  </h1>
                  {/*
                <p className="text-gray-300 mt-2">
                   {video.snippet.description.slice(0, 20)}...
                </p>*/}

                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full mt-4 transition duration-300">
                    <Link
                      to={{ pathname: "/AnimeStream" }}
                      state={{ videoData: video.link_url, title: video.title }}
                    >
                      Watch
                    </Link>
                  </button>
                </motion.div>
              ))
            ) : (
              <p className="text-white text-2xl">Loading....</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Home;
