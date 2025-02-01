import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <header>

            <nav className="flex flex-row h-20 border-b-2 border-blue-900 justify-between items-center py-4 px-8 bg-gray-900 text-white span-2 span:bg-blue-700"
            >
                <div>
                    <a href="#">Anime Streaming</a>
                </div>
                <div>
                    <ul class="flex flex-row justify-between items-center gap-4">
                        <li><Link to="/" className="z-1 nav-item">Home</Link></li>
                        <li><Link to="/Anime" className="z-1 nav-item">Anime</Link></li>
                        <li><Link to="/Movies" className="z-1 nav-item">Movies</Link></li>
                        <li><Link to="/Series" className="z-1 nav-item">Series</Link></li>
                        <li>
                            {props.login ? (
                                <Link to="/login">Login</Link>
                            ) : (
                                <Link to="/logout">Log out</Link>
                            )}
                        </li>



                    </ul>
                </div>

            </nav>
        </header>
    );
}

export default Header;