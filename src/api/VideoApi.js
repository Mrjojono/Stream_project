import axios from "axios";

async function getVideoList(query) {
    const url = "https://api.jikan.moe/v4/anime";

    try {
        const { data } = await axios.get(url, {
            params: {
                limit:10,
                q: query,
            },
        });
        return data;
    } catch (err) {
        console.error("Error fetching video list:", err.message);
        throw new Error("Failed to fetch video list. Please try again later.");
    }
    
}

export default getVideoList;