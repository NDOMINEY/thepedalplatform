import React, { useContext, useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

//
import {
  SetCurrentUserContext,
  CurrentUserContext,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import logo_short_transparent from "../assets/logo_short_transparent.png";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);

  const currentUser = useContext(CurrentUserContext);
  const setCurrentUser = useContext(SetCurrentUserContext);
  var profile_id;

  if (currentUser) {
    profile_id = currentUser.profile_id;
  }

  const handleLogout = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
    setExpanded(false);
  };

  const loggedIn = (
    <>
      <NavDropdown title="My Account" id="basic-nav-dropdown">
        <NavDropdown.Item>
          <Link
            to={`/profile/${profile_id}`}
            className="nav-link"
            onClick={() => setExpanded(false)}
          >
            My Profile
          </Link>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <Link
            to={`/favourites/${profile_id}`}
            className="nav-link"
            onClick={() => setExpanded(false)}
          >
            Favourite <br />
            Pedals
          </Link>
        </NavDropdown.Item>
        <NavDropdown.Item>
          <Link to="/" className="nav-link" onClick={handleLogout}>
            Logout
          </Link>
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
  const loggedOut = (
    <>
      <Link to="/login" className="nav-link" onClick={() => setExpanded(false)}>
        Login
      </Link>
      <Link
        to="/register"
        className="nav-link"
        onClick={() => setExpanded(false)}
      >
        Register
      </Link>
    </>
  );

  return (
    <Navbar
      fixed="top"
      className={styles.NavBar}
      expanded={expanded}
      expand="lg"
    >
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" className="nav-link" onClick={() => setExpanded(false)}>
            <img src={logo_short_transparent} alt="logo" height="50" />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbarScroll"
          onClick={() => setExpanded(!expanded)}
        />

        <Navbar.Collapse id="navbarScroll">
          <Nav className="ml-auto" navbarScroll>
            <Link
              to="/"
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="nav-link"
              onClick={() => setExpanded(false)}
            >
              Pedals
            </Link>

            {currentUser ? loggedIn : loggedOut}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
