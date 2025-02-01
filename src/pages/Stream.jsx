import React from 'react';
import wall from '../assets/wall.jpg';
import ReactPlayer from 'react-player/youtube';


function Stream(props){
  console.log(props.data);

return (
 <div className='container mx-auto mt-12 p-5  bg-gray-100 shadow-lg text-center mb-12 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-2xl flex flex-wrap gap-2 min-h-screen  '>
   
      <div className="bg-black/50 border-2 border-violet-950 shadow-inner p-5 rounded-lg m-4">
      <div className='mt-4 mb-4'>
            <h1 className="text-4xl font-bold text-white mb-4">Welcome to Anime Streaming</h1>
            <p className="text-lg text-gray-300">Stream your favorite anime shows and movies</p>
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
              Get Started
            </button>
         </div> 
         <img src={wall} alt="anime" className="w-[500px] h-[600px] object-cover rounded-lg"/>
         
      </div>


      <div className='players flex-1 flex mt-3 flex-wrap  flex-col '>
         {/* Add your video player components here */}
         <div className="w-full h-[500px] bg-black">
      <ReactPlayer
        url={props.data.trailer.embed_url}
        controls
        width="100%"
        height="100%"
      />
    </div>
         <hr className='w-full mt-0 border-2 border-blue-900'/>
         <div>
              <h1 className='text-2xl font-bold text-white text-center'>Commentaire </h1>
         </div>
      
         
      </div>
   
 </div>
)
}

export default Stream;