import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Movies({ videos,setPages }) {
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
      <div className="text-center mb-12 bg-gradient-to-r from-gray-700 via-gray-900 to-black rounded-2xl flex gap-8 flex-wrap flex-row min-h-screen p-4 border-none">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-6 mb-5 justify-center w-full"
        >
          {videos?.length > 0 ? (
            videos.map((video) => (
              <motion.div
                key={video.id}
                variants={cardVariants}
                className="card bg-black/60 border-2 border-violet-950 rounded-lg shadow-lg hover:shadow-violet-900/50 transition-shadow duration-300 w-full sm:w-[300px] p-4"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${video.poster_path}`}
                  alt={video.title}
                  className="w-full h-[200px] object-cover rounded-lg"
                />
                <h1 className="text-white text-xl font-bold mt-4">
                  {video.title?.slice(0, 20)}...
                </h1>
                <p className="text-gray-300 mt-2">
                  {video.overview ? video.overview.slice(0, 50) : "No description"}...
                </p>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full mt-4 transition duration-300">
                  <Link to={{ pathname: "/MovieStream" }} state={{ videoData: video,
                    videos : videos
                   }}>
                    Watch
                  </Link>
                </button>
              </motion.div>
            ))
          ) : (
            <p className="text-white text-2xl">Aucun film trouvé...</p>
          )}
        </motion.div>
      </div>
      <div className="flex flex-row  flex-wrap relative justify-center gap-2 backdrop:blur-2xl items-center">
        <input
          type="button"
          onClick={() => {
            setPages((prev) => (prev !== 0 ? 0 : prev));
            window.scrollTo(0, 0);
          }}
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 items-center  gap-2  text-white px-4 py-2  rounded-xl  mt-4 transition duration-300"
          value={0}
        />

        <input
          type="button"
          onClick={() => {
            setPages((prev) => (prev !== 1 ? 1 : prev));
            window.scrollTo(0, 0);
          }}
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 items-center  gap-2  text-white px-4 py-2  rounded-xl  mt-4 transition duration-300"
          value={1}
        />
        <input
          type="button"
          onClick={() => {
            setPages((prev) => (prev !== 2 ? 2 : prev));
            window.scrollTo(0, 0);
          }}
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 items-center  gap-2  text-white px-4 py-2  rounded-xl  mt-4 transition duration-300"
          value={2}
        />
        <input
          type="button"
          onClick={() => {
            setPages((prev) => (prev !== 3 ? 3 : prev));
            window.scrollTo(0, 0);
          }}
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 items-center  gap-2  text-white px-4 py-2  rounded-xl  mt-4 transition duration-300"
          value={3}
        />
        <input
          type="button"
          onClick={() => {
            setPages((prev) => (prev !== 4 ? 4 : prev));
            window.scrollTo(0, 0);
          }}
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 items-center  gap-2  text-white px-4 py-2  rounded-xl  mt-4 transition duration-300"
          value={4}
        />
        <input
          type="button"
          onClick={() => {
            setPages((prev) => (prev !== 5 ? 5 : prev));
            window.scrollTo(0, 0);
          }}
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 items-center  gap-2  text-white px-4 py-2  rounded-xl  mt-4 transition duration-300"
          value={5}
        />
        <input
          type="button"
          onClick={() => {
            setPages((prev) => (prev !== 6 ? 6 : prev));
            window.scrollTo(0, 0);
          }}
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 items-center  gap-2  text-white px-4 py-2  rounded-xl  mt-4 transition duration-300"
          value={6}
        />
      </div>
    </div>
  );
}

export default Movies;
