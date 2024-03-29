import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../api/axiosDefaults";
import loading from "../assets/loading.gif";
import styles from "../styles/Profile.module.css";
import ProductDisplay from "../components/ProductDisplay";

const Favourite = () => {
  const { id } = useParams();

  const [hasLoaded, setHasLoaded] = useState(false);
  const [favouriteData, setFavouriteData] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: favourites } = await axiosReq.get(
          `/favourite/?owner=${id}`
        );
        setFavouriteData(favourites);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    handleMount();
  }, [id]);

  return (
    <div>
      <section className={styles.content_container}>
        <h1>Your Favourites</h1>
        <div className={styles.favourite_list}>
          {hasLoaded ? (
            favouriteData.length ? (
              favouriteData.map((favourite) => (
                <ProductDisplay id={favourite.pedal} />
              ))
            ) : (
              <div>
                <p>No Favourites</p>
              </div>
            )
          ) : (
            <div>
              <p>Loading</p>
              <img src={loading} alt="loading"></img>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Favourite;
