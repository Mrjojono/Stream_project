import axios from "axios";

const URL_BASE = process.env.REACT_APP_URL_BASE;

// Fonction pour mélanger un tableau (algorithme de Fisher-Yates)
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}


async function getVideoList(query) {
  const apiKey = "AIzaSyAkZdTNuZyGqhqsy42_gVLQ0H-6GkybxUY"; 
  const searchQuery = query || "anime"; 
  const maxResults = 100; 

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&maxResults=${maxResults}&key=${apiKey}`;

  try {
    const { data } = await axios.get(url);  
    const shuffledList = shuffleArray(data.items);
    return { 
      items: shuffledList,
      totalResults: data.pageInfo.totalResults
    };

  } catch (err) {
    console.error("Error fetching video list:", err);
    if (err.response) {
     
      console.error("Response error:", err.response);
    } else if (err.request) {
     
      console.error("Request error:", err.request);
    } else {
     
      console.error("General error:", err.message);
    }
    throw new Error("Failed to fetch video list. Please try again later.");
  }
}


async function searchAnime(query) {
  const apiKey = "AIzaSyAkZdTNuZyGqhqsy42_gVLQ0H-6GkybxUY"; // Remplacer par ta clé API
  const maxResults = 20; 

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&key=${apiKey}`;

  try {
    const { data } = await axios.get(url);
    console.log(data); 

    return data.items; 
  } catch (error) {
    console.error("Erreur lors de la récupération des vidéos :", error);
    throw new Error("Failed to fetch search results from YouTube.");
  }
}


async function getAnime(pages) {
  let url;
  if (pages == null) {
    url = `${URL_BASE}/anime`;  // Utilise l'URL_BASE de .env
  } else {
    url = `${URL_BASE}/anime?page=${pages}`;
  }

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des vidéos :", error);
    throw new Error("Failed to fetch anime list.");
  }
}


async function getMovies(pages) {
  let url;
  if (pages==null){
    url = `${URL_BASE}/movies`;
  }else{
    url = `${URL_BASE}/movies?page=${pages}`;
  }
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des vidéos :", error);
    throw new Error("Failed to fetch anime list.");
  }
}




async function getPictures() {
  const url = `${URL_BASE}/random`;
  
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des photos:", error);
    throw new Error("Failed to fetch anime list.");
  }
}


async function getEpisode(title) {
  const url =  `${URL_BASE}/episodes`;

  try {
    const response = await axios.post(url, { title }, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return { data: response.data, error: null }; // On récupère uniquement response.data
  } catch (error) {
    console.error("Erreur lors de la récupération des épisodes:", error);
    return { data: null, error };
  }
}

export { getVideoList, searchAnime, getAnime,getPictures,getEpisode,getMovies };
