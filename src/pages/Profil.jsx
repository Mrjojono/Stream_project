import React from "react";
import wall from "../assets/wall.jpg";

function Profil() {
  return (
    <div className="info_profil">
      <div className="img_profil">
        <img
          src={wall}
          alt="Fond d'écran de profil"
          className="w-40 h-40 rounded-full"
        />
      </div>

      <div class="bg-blue-950 mt-10  p-6 rounded-2xl shadow-lg shadow-violet-900/50 ">
        <div class="flex flex-col gap-12 p-8 items-start">
          <div class="flex flex-row  items-center w-full">
            <label for="nom" class="text-white font-bold"></label>
            <input
              type="text"
              placeholder="Nom"
              id="nom"
              class="profil_input"
            />
          </div>

          <div class="flex flex-row  items-center w-full">
            <label for="prenom" class="text-white font-bold"></label>
            <input
              type="text"
              placeholder="Prénom"
              id="prenom"
              class="profil_input"
            />
          </div>

          <div class="flex flex-row  items-center w-full">
            <label for="email" class="text-white font-bold"></label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              class="profil_input"
            />
          </div>

          <div class="flex flex-row  items-center w-full">
            <label for="telephone" class="text-white font-bold"></label>
            <input
              type="text"
              placeholder="Téléphone"
              id="telephone"
              class="profil_input"
            />
          </div>
          <div className="flex flex-row justify-between items-center gap-60">
            <button className="bg-black p-5 w-60 rounded-2xl text-white  ">
              <i className="fas fa-save"></i> Save
            </button>

            <button className="bg-red-950 p-5 w-60 rounded-2xl text-white">
              <i className="fas fa-trash"></i> Delete profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
