import React from 'react';
import { Navbar, Nav } from "react-bootstrap";
import logo_short_transparent from '../assets/logo_short_transparent.png';
import styles from '../styles/NavBar.module.css';


const NavBar = () => {
    return (
        <Navbar className={styles.NavBar} expand="lg">
            <Navbar.Brand href="#">
                <img src={logo_short_transparent} alt='logo' height="50" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav className="ml-auto text-right links">
                    <Nav.Link href="">Home</Nav.Link>
                    <Nav.Link href="">Products</Nav.Link>
                    <Nav.Link href="">Login</Nav.Link>
                    <Nav.Link href="">Register</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;