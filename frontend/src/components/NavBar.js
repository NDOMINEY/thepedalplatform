import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const NavBar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="">The Pedal Platform</Navbar.Brand>
            <Nav className="ml-auto">
                <Nav.Link href="">Home</Nav.Link>
                <Nav.Link href="">Products</Nav.Link>
                <Nav.Link href="">Login</Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default NavBar;