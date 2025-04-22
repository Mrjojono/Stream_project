 // WebSocket connection


async function authenticate(email, password) {
    
    const url = `http://localhost:8000/auth/login`;

    const requestData = { 
        email: email, 
        password: password 
    };

    console.log("Données envoyées:", requestData);
    try {
        const response = await fetch(url, {
            method: "POST",  // Utiliser POST au lieu de GET
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData) // Envoyer les données
        });

        if (!response.ok) {
            throw new Error(`Erreur réseau: ${response.statusText}`);
        }

       


        const data = await response.json();
        return { data, error: null }; 
    } catch (error) {
        return { data: null, error}; 
    }
}
/*
function addSystemMessage(message) {
    
    socket.send(JSON.stringify({
        username: data.data.NOM,
        iduser : data.data.IDUSER
      }));
}
*/
async function register(datas) {

    const url = `http://localhost:8000/auth/register`;

    console.log("Données envoyées:", datas);

    try{
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datas)
        });
        if(!response.ok){
            throw new Error(`Erreur réseau: ${response.statusText}`);
        }
        const data = await response.json();
        return { data, error: null };
    }catch(error){
        return { data: null, error}; 
    }
    
}

async function logout(){

    const url = "http://localhost:8000/auth/logout";

    try{
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if(!response.ok){
            throw new Error(`Erreur réseau: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
    }catch(error){
            return { data: null, error}; 
        }
    
}


export default {authenticate,register,logout};