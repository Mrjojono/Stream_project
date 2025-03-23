import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Anime({ videos, search }) {
  const [filteredVideos, setFilteredVideos] = useState(videos);
  console.log("mes videos ");
  console.log(videos);
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

  return (
    <div className="info">
      <div className="text-center  mb-12 bg-gradient-to-r from-gray-700 via-gray-900 to-black rounded-2xl flex gap-8 flex-wrap flex-row min-h-screen p- border-none">
      
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-6 mb-5 justify-center w-full"
        >
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
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
                    state={{ videoData: video.link_url,
                        title: video.title,
                        img: video.thumbnail_url,
                     }}
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
  );
}

export default Anime;
