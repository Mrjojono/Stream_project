import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; // Ajouter l'importation de useLocation
import { getEpisode } from "../api/VideoApi";
import wall from "../assets/wall.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


function AnimeStream() {


  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const commentsEndRef = useRef(null);

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

 
  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  
  
  const location = useLocation();
  const {videoData,videos} = location.state || {};

  
  
  
 
  
  if (!videoData) {
    return <div className="text-4xl text-white text-center"> Loading...</div>;
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([
        ...comments,
        {
          username: "User",
          text: comment,
          date: new Date().toLocaleDateString(),
        },
      ]);
      setComment("");
    }
  };
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

  if (!videoData) {
    return <div className="text-4xl text-white text-center">Loading...</div>;
  }

 
  

  return (
    <div className="info flex-grow flex flex-col ">
      <div className="players flex-1 flex mt-3 flex-wrap flex-col">
        <div className="max-w-full flex flex-col gap-2 h-[600px] rounded-2xl ">
          <span>
           

            <img
            src= {`https://image.tmdb.org/t/p/w500${videoData.poster_path}`} // Utiliser la bonne source d'image
            alt="anime"
            className="w-full  h-[100px] object-cover blur-xl"
          />
            
            <h1 className="text-white text-4xl text-start">{videoData.title} 
            </h1>
            
          </span>
          <iframe
         src={` https://vidapi.xyz/embedmulti/movie/${videoData.id}`}
         width="100%"
         height="100%"
         allowFullScreen
         title="video"
         className="rounded-2xl"
        />

        </div>

        {/* ceci pour la liste des episodes suivant */}
        <div>
          <div className="flex rounded-xl h-fit backdrop:blur-2xl mt-20 flex-row justify-between gap-5 ">
         
         
          <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-wrap gap-6 mb-5 justify-center w-full"
        >
          {videos.length > 0 ? (
            videos.map((video) => (
           
              <motion.div
                key={video.id}
                variants={cardVariants} 
                
                className="card bg-black/60 border-2 border-violet-950 rounded-lg shadow-xl hover:shadow-violet-900/50 transition-shadow duration-300 w-full sm:w-[300px] p-4"
              >
               <img
                  src={`https://image.tmdb.org/t/p/w500${video.poster_path}`}
                  alt={video.title}
                  className="w-full h-[200px] object-cover rounded-lg"
                />
                <h1 className="text-white text-xl font-bold mt-4">
               {video.title.slice(0, 20)}...
               
                </h1>
                

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full mt-4 transition duration-300"
                onClick={() => {
                    window.scrollTo(0, 0);
                }}
                >
                  <Link
                    to={{ pathname: "/MovieStream" }}
                    state={{ videoData: video,
                        videos: videos
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

        <h2 className="text-2xl text-white mt-10">Real time chat </h2>
        {/* Display the list of comments */}

        
        <div className="bg-black mt-10 p-3 text-white">
          <div
            className="overflow-y-auto -scroll-m-3 custome-scrollbar"
            style={{ maxHeight: "300px" }}
          >
            {comments.length === 0 ? (
              <p className="text-black">No comments yet.</p>
            ) : (
              comments.map((comment, index) => (
                <div key={index} className="flex flex-row gap-5 mt-10 mb-3">
                  <div>
                    <img
                      src={wall}
                      className="w-12 h-12 object-cover rounded-3xl"
                      alt="user-avatar"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="text-start text-white">
                      {comment.username}
                    </span>

                    <div className="text-1xl text-start rounded-3xl bg-slate-950 p-2 w-80 text-white">
                      <p>{comment.text}</p>
                    </div>

                    <div className="flex flex-row backdrop:blur-2xl shadow-2xl shadow-violet-500 justify-between mt-3">
                      <div className="flex flex-row gap-3"></div>
                      <div className="text-gray-500 ml-2 text-sm">
                        Posted on: {comment.date}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            {/* L'élément de fin pour que la scrollbar se déplace jusqu'à lui */}
            <div ref={commentsEndRef} />
          </div>
        </div>

        {/* Comment Section */}
        <div className="backdrop:blur-2xl text-white mt-10">
          <hr className="w-full mt-0 border-1 border-black" />
          <div className="flex flex-row justify-between gap-5 mb-2">
            <span className="text-2xl text-gray-300 font-semibold ">Chat</span>
            <div className="flex flex-row gap-2"></div>
          </div>

          <div className="p-2">
            <textarea
              value={comment}
              onChange={handleCommentChange}
              className="flex flex-wrap p-5 h-24 border-b-white w-full focus:outline-none rounded-s bg-gray-800 text-white"
              placeholder="Add Comment...."
            ></textarea>
            <div className="flex flex-row justify-end gap-5 p-2">
              <button
                onClick={handleCommentSubmit}
                className="bg-blue-700 hover:bg-blue-950 text-white text-1xl p-2 rounded-2xl h-12"
              >
                Envoyer commentaire
              </button>
            </div>
          </div>
        </div>
        {/* Afficher les détails de la vidéo */}
      </div>
    </div>
  );
}

export default AnimeStream;
