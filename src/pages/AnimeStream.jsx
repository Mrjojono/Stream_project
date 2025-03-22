import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Ajouter l'importation de useLocation
import wall from '../assets/wall.jpg';


function AnimeStream() {
  console.log("donner passer");
   
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  // Récupérer les données passées via l'état
  const location = useLocation();
  const { videoData } = location.state || {}; 
  console.log(videoData);

  // Vérifier si les données vidéo existent
  if (!videoData) {
    return <div>Loading...</div>; 
  }

 

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([
        ...comments,
        { username: 'User', text: comment, date: new Date().toLocaleDateString() },
      ]);
      setComment(''); 
    }
  };

  const baseurl = "https://2anime.xyz/embed/";
  return (
    <div className='info flex-grow flex flex-col '>

     

      <div className='players flex-1 flex mt-3 flex-wrap flex-col'>
        <div className=" max-w-full  h-[600px] rounded-2xl bg-black">
     
      <iframe
        src={baseurl+videoData}
        width="100%"
        height="100%"
        allowFullScreen
        title="video"
      ></iframe>
        </div>
       
        <hr className='bg-black border-opacity-10 border-black mt-4 mb-1' />

        {/* Comment Section */}
        <div className='bg-gray-800 text-white'>
          <hr className='w-full mt-0 border-1 border-black' />
          <div className='flex flex-row justify-between gap-5 mb-2'>
            <span className='text-2xl text-gray-300 font-semibold'>Commentaire</span>
            <div className='flex flex-row gap-2'>
              <i className="fas fa-heart"></i> Like
              <i className="fas fa-dislike"></i> Dislike
              <i className="fas fa-share"></i> Share
            </div>
          </div>

          <div className='p-2'>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              className='flex flex-wrap p-5 h-24 border-b-white w-full focus:outline-none rounded-s bg-gray-950 text-white'
              placeholder='Add Comment....'
            ></textarea>
            <div className='flex flex-row justify-end gap-5 p-2'>
              <button className='bg-red-500 hover:bg-red-600 text-white text-1xl p-2 rounded-2xl h-12'>
                Annuller
              </button>
              <button
                onClick={handleCommentSubmit}
                className='bg-blue-700 hover:bg-blue-950 text-white text-1xl p-2 rounded-2xl h-12'>
                Envoyer commentaire
              </button>
            </div>

            {/* Display the list of comments */}
            <div className='bg-gray-800 p-3 text-white'>
              {comments.length === 0 ? (
                <p className="text-gray-400">No comments yet.</p>
              ) : (
                comments.map((comment, index) => (
                  <div key={index} className='flex flex-row gap-5 mb-3'>
                    <div>
                      <img
                        src={wall}
                        className='w-12 h-12 object-cover rounded-3xl'
                        alt="user-avatar"
                      />
                    </div>
                    <div className='flex flex-col gap-3'>
                      <span className='text-start text-white '>{comment.username}</span>
                      
                      <div className='text-1xl text-start rounded-3xl bg-slate-950 p-8 w-80 text-white'>
                        <p>{comment.text}</p>
                      </div>
                      
                      <div className='flex flex-row backdrop:blur-2xl shadow-2xl shadow-violet-500 justify-between mt-3'>
                        <div className='flex flex-row gap-3'>
                        </div>
                        <div className='text-gray-500 ml-2 text-sm'>
                          Posted on: {comment.date}
                        </div>
                      </div>
                      
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
{/* Afficher les détails de la vidéo 
    
*/}
        
     
      </div>


    </div>
  );
}

export default AnimeStream;
