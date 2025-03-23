import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header({ login, searchTerm, setSearchTerm }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav className="fixed top-0 w-full h-20 border-b-2 border-blue-900 bg-gray-900 text-white z-10">
        <div className="flex justify-between items-center px-6 md:px-8 h-full">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold">Anime Streaming</Link>

          {/* Search bar (hidden on small screens) */}
          <div className="hidden md:block">
            <input
              type="text"
              name="search_input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-3xl h-10 w-[250px] outline-none text-black text-center placeholder:p-4"
              placeholder="Search"
            />
          </div>

          {/* Burger Menu (only on small screens) */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
              {isOpen ? "✕" : "≡"}
            </button>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-6 items-center">
            <li><Link to="/" className="nav-item"><i className="fa-solid fa-house"></i> Home</Link></li>
            <li><Link to="/Animes" className="nav-item"><i className="fas fa-dragon"></i> Anime</Link></li>
            <li><Link to="/Movies" className="nav-item"><i className="fas fa-film"></i> Movies</Link></li>
            <li><Link to="/Series" className="nav-item"><i className="fas fa-tv"></i> Series</Link></li>
            <li><Link to="/Profil" className="nav-item"><i className="fas fa-user"></i> Profil</Link></li>
            <li>
              {login ? (
                <Link to="/login" className="nav-item"> <i className="fas fa-sign-out-alt"></i> Log out</Link>
              ) : (
                <Link to="/login" className="nav-item"> <i className="fas fa-sign-in-alt"></i> Login</Link>
              )}
            </li>
          </ul>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-gray-900 text-white p-4 absolute w-full top-20 left-0">
            <ul className="flex flex-col gap-4 text-center">
              <li><Link to="/" onClick={() => setIsOpen(false)} ><i className="fa-solid fa-house"> </i>  Home</Link></li>
              <li><Link to="/Anime" onClick={() => setIsOpen(false)}><i className="fas fa-dragon"></i> Anime</Link></li>
              <li><Link to="/Movies" onClick={() => setIsOpen(false)}><i className="fas fa-film"></i> Movies</Link></li>
              <li><Link to="/Series" onClick={() => setIsOpen(false)}><i className="fas fa-tv"></i> Series</Link></li>
              <li><Link to="/Profil" onClick={() => setIsOpen(false)}><i className="fas fa-user"></i> Profil</Link></li>
              <li>
                {login ? (
                  <Link to="/login" onClick={() => setIsOpen(false)}> <i className="fas fa-sign-out-alt"></i> Log out</Link>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)}> <i className="fas fa-sign-in-alt"></i> Login</Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
