import axios from "axios";

// Fonction pour mélanger un tableau (algorithme de Fisher-Yates)
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

async function getVideoList() {
  const url = "https://api.jikan.moe/v4/anime";

  try {
    const { data } = await axios.get(url, {
      params: {
        limit: 20,  
      },
    });
    
    // Mélange le tableau des anime pour un ordre aléatoire
    const shuffledList = shuffleArray(data.data);
    
    // Retourne l'objet complet en remplaçant le tableau par le tableau mélangé
    return { ...data, data: shuffledList };
    
  } catch (err) {
    console.error("Error fetching video list:", err.message);
    throw new Error("Failed to fetch video list. Please try again later.");
  }
}

export default getVideoList;
