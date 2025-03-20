import React from "react";
import { Link } from "react-router-dom";

function Header({ login, onLogin, searchTerm, setSearchTerm }) {
 /*
  const handleLogout = () => {
    onLogin(false);
  };*/

  return (
    <header>
      <nav className="flex fixed top-0 w-full h-20 border-b-2 border-blue-900 items-center py-4 px-8 bg-gray-900 text-white z-10">
        <div className="flex justify-between w-full items-center">
          {/* Logo */}
          <div className="w-full md:w-auto">
            <Link to="/" className="text-2xl font-extrabold">Anime Streaming</Link>
          </div>

          {/* Barre de recherche */}
          <div className="w-full md:w-auto">
            <input
              type="text"
              name="search_input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-3xl h-11 w-full md:w-[300px] outline-1 outline-indigo-900 focus:outline-none text-black text-center placeholder:p-4 placeholder:ml-5"
              placeholder="Search"
            />
          </div>

          {/* Liens de navigation */}
          <ul className="flex gap-6 items-center">
            <li><Link to="/" className="nav-item"><i className="fa-solid fa-house"></i> Home</Link></li>
            <li><Link to="/Anime" className="nav-item"><i className="fas fa-dragon"></i> Anime</Link></li>
            <li><Link to="/Movies" className="nav-item"><i className="fas fa-film"></i> Movies</Link></li>
            <li><Link to="/Series" className="nav-item"><i className="fas fa-tv"></i> Series</Link></li>
            <li><Link to="/Profil" className="nav-item"><i className="fas fa-user"></i> Profil</Link></li>
            <li>
              {login ? (
               
                  <Link to="/login" className="nav-item">
                  <i className="fas fa-sign-out-alt"></i> Log out
                  </Link>
             
              ) : (
                <Link to="/login" className="nav-item">
                  <i className="fas fa-sign-in-alt"></i> Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
