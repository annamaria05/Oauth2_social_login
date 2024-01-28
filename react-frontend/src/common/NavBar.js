import React, { useState } from "react";
import { NavLink} from "react-router-dom";
import logoImage from "../img/Logo.png";
import "./NavBar.css";

const NavBar = ({ authenticated, onLogout, history }) => {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    const handleProfileClick = () => {
        history.push("/profile");
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                {/* Logo */}
                <NavLink exact to="/" className="nav-logo">
                    <img src={logoImage} alt="Logo" className="logo-image" width={140} />
                </NavLink>

                {/* Menu di navigazione */}
                <ul className={click ? "nav-menu active" : "nav-menu"}>
                    <li className="nav-item">
                        <NavLink
                            exact
                            to="/"
                            activeClassName="active"
                            className="nav-links"
                            onClick={handleClick}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            exact
                            to="/about"
                            activeClassName="active"
                            className="nav-links"
                            onClick={handleClick}
                        >
                            About
                        </NavLink>
                    </li>
                    {authenticated ? (
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/profile"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleProfileClick}
                            >
                                Profile
                            </NavLink>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/login"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Login
                            </NavLink>
                        </li>
                    )}

                    {!authenticated && (
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/signup"
                                activeClassName="active"
                                className="nav-links"
                                onClick={handleClick}
                            >
                                Sign up
                            </NavLink>
                        </li>
                    )}

                    {authenticated && (
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/login"
                                className="nav-links"
                                onClick={() => {
                                    onLogout();
                                    handleClick();
                                }}
                            >
                                Logout
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
