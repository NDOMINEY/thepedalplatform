import React, { useState, useEffect } from "react";
import styles from "../styles/ProductList.module.css";
import { axiosReq } from "../api/axiosDefaults";
import { Link } from "react-router-dom";
import loading from "../assets/loading.gif";

function ProductDisplay(props) {
  const id = props.id;

  const [pedalDetail, setPedal] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: pedalDetail }] = await Promise.all([
          axiosReq.get(`/pedal/${id}`),
        ]);

        setPedal(pedalDetail);

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
      {hasLoaded ? (
        <Link to={`/products/${pedalDetail.id}`} key={id}>
          <div className={styles.product_items}>
            <h6 className={styles.name_color}>{pedalDetail.name}</h6>
            <h6 className={styles.brand_color}>{pedalDetail.brand}</h6>
            <h6 className={styles.price_color}>{pedalDetail.price}</h6>

            <div className={styles.pedal_light}></div>

            <div>
              <button className={styles.pedal_button}></button>
            </div>
          </div>
        </Link>
      ) : (
        <div className={styles.product_items}>
          <p className={styles.loading_text}>Loading</p>
          <img src={loading} alt="loading"></img>
        </div>
      )}
    </div>
  );
}

export default ProductDisplay;
