import React, { useContext } from "react";
import wall from "../assets/wall.jpg";
import UserContext from "../components/userContext";
import { Link } from "react-router-dom";

function Profil() {
  const { user } = useContext(UserContext); 
  

  return (
    <div>
      {user ? (
        <div className="info_profil">
          <div className="img_profil">
            <img
              src={wall}
              alt="Fond d'écran de profil"
              className="w-40 h-40 rounded-full"
            />
          </div>

          <div className="bg-blue-950 mt-10 p-6 rounded-2xl shadow-lg shadow-violet-900/50">
            <div className="flex flex-col gap-12 p-8 items-start">
              <div className="flex flex-row items-center w-full">
                <label htmlFor="nom" className="text-white font-bold"></label>
                <input
                  type="text"
                  placeholder="Nom"
                  id="nom"
                  className="profil_input"
                  value={user.NOM || ""}
                />
              </div>

              <div className="flex flex-row items-center w-full">
                <label
                  htmlFor="prenom"
                  className="text-white font-bold"
                ></label>
                <input
                  type="text"
                  placeholder="Prénom"
                  id="prenom"
                  className="profil_input"
                  value={user.PRENOM || ""}
                />
              </div>

              <div className="flex flex-row items-center w-full">
                <label htmlFor="email" className="text-white font-bold"></label>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="profil_input"
                  value={user.EMAIL || ""}
                />
              </div>

              <div className="flex flex-row items-center w-full">
                <label
                  htmlFor="telephone"
                  className="text-white font-bold"
                ></label>
                <input
                  type="text"
                  placeholder="Téléphone"
                  id="telephone"
                  className="profil_input"
                  value={user.telephone || ""}
                />
              </div>

              <div className="flex flex-row justify-between items-center gap-60">
                <button className="bg-black p-5 w-60 rounded-2xl text-white">
                  <i className="fas fa-save"></i> Save
                </button>

                <button className="bg-red-950 p-5 w-60 rounded-2xl text-white">
                  <i className="fas fa-trash"></i> Delete profile
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="info_profil mt-96">
          <p className="text-center text-white text-xl mt-10">
            Aucun utilisateur connecté.
          </p>
         
            <Link to="/login" className="text-white">
            <button className="bg-blue-800 rounded-2xl p-5 hover:bg-blue-700 shadow-lg shadow-blue-500   ">
              Se connecter
              </button>
            </Link>
         
        </div>
      )}
    </div>
  );
}

export default Profil;
