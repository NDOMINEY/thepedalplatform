import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import logo_transparent from "../assets/logo_transparent.png";
import styles from "../styles/Landing.module.css";

const Landing = () => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className={styles.landing_container}>
      <h1>WELCOME TO</h1>
      <img src={logo_transparent} alt="logo" />
      <br />
      <br />

      <h5>
        A community for pedal enthusiasts to leave reviews, comments and keep a
        list of your favourite pedals!
      </h5>
      <br />
      <br />

      <h6>
        Take a look at our pedal inventory here &#9758;
        <Link to="/products" className={styles.links}>
          &#9783;
        </Link>
      </h6>
      <br />
      {!currentUser ? (
        <>
          <h6>
            Login here &#9758;
            <Link to="/login" className={styles.links}>
              &#10162;
            </Link>
          </h6>
          <h6>
            Register here &#9758;
            <Link to="/register" className={styles.links}>
              &#9998;
            </Link>
          </h6>
        </>
      ) : null}
      <br />
    </div>
  );
};

export default Landing;
