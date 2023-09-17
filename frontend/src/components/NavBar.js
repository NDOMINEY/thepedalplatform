import React, { useContext } from 'react';
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo_short_transparent from '../assets/logo_short_transparent.png';
import styles from '../styles/NavBar.module.css';
import { CurrentUserContext } from "../App";


const NavBar = () => {
    const currentUser = useContext(CurrentUserContext);

    const loggedIn = (
        <>
            <p>Welcome!</p>
        </>
    );
    const loggedOut = (
        <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
        </>
    );


    return (
        <Navbar className={styles.NavBar} expand="lg" fixed="top">
            <NavLink to="/">
                <Navbar.Brand>
                    <img src={logo_short_transparent} alt='logo' height="50" />
                </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav className="ml-auto text-right">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/products">Products</NavLink>

                    {currentUser ? loggedIn : loggedOut}

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;