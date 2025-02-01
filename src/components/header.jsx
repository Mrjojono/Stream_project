import React from "react";
import { Link } from "react-router-dom";


function Header(props) {
    return (
        <header>

            <nav className="flex flex-row h-20 border-b-2 border-blue-900 justify-between items-center py-4 px-8 bg-gray-900 text-white span-2 span:bg-blue-700"
            >
                <div>
                    <Link to="/" className="text-2xl font-extrabold">Anime Streaming</Link>
                </div>
                <div>
                    <ul class="flex flex-row justify-between items-center gap-4">
                        <li><Link to="/" className="z-1 nav-item"><i class="fa-solid fa-house"></i> Home</Link></li>

                        <li><Link to="/Anime" className="z-1 nav-item text-inherit">
                        <i class="fas fa-dragon"></i>
                        <span style={{ marginLeft: '8px' }}>Anime</span>
                        </Link></li>

                        <li><Link to="/Movies" className="z-1 nav-item text-inherit "> 
                            <i className="fas fa-film"></i>
                            <span  className=" ml-[9px]">Movies</span>
                        </Link></li>

                        <li><Link to="/Series" className="z-1 nav-item text-inherit">
                        <i className="fas fa-tv"></i>
                          <span className="ml-[9px]">Series</span>
                        </Link></li>

                        <li>
                            {props.login ? (
                                <Link to="/login">
                                    <i className="fas fa-user"></i>
                                    <span className="ml-3">
                                    Login
                                    </span>
                                    </Link>
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