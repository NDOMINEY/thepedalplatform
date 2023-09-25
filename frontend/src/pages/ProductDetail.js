import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import styles from '../styles/ProductDetail.module.css';


const ProductDetail = () => {
    const { id } = useParams();
    const [pedal, setPedal] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: pedal }] = await Promise.all([
                    axiosReq.get(`/pedal/${id}`),
                ]);
                setPedal({ results: [pedal] });
                console.log(pedal);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        handleMount();
    }, [id]);

    return (
        <>
            <section>
                <Link to="/products">
                    <button className={styles.btn}>
                        &#8592; The Pedal Inventory</button>
                </Link>
            </section>

            <section>
                {hasLoaded ? pedal.results.map((product) => (
                    <div className={styles.info_container} key={product.id}>
                        <div className={styles.product_items} >

                            <h6 className={styles.name_color}>{product.name}</h6>
                            <h6 className={styles.brand_color}>{product.brand}</h6>
                            <h6 className={styles.price_color}>{product.price}</h6>

                            <div className={styles.pedal_light}>
                            </div>

                            <div>
                                <button className={styles.pedal_button}></button>
                            </div>
                        </div>

                        <div className={styles.product_summary}>
                            <h3>{product.name}</h3>
                            <p>Brand: {product.brand}</p>
                            <p>Category: {product.category}</p>
                            <p>Price: {product.price}</p>
                            <p>Average Rating: {product.review_average}/5 </p>
                            <p>Total Ratings: {product.review_count}</p>
                        </div>
                    </div>
                )) : (
                    <div className={styles.review_container}>
                        <p>Loading...</p>
                    </div>
                )}
            </section>

            <section>
                {hasLoaded ? (
                    <div className={styles.review_container}>
                        <h3>
                            Reviews
                        </h3>
                    </div>
                ) : (
                    <div></div>
                )}
            </section>
        </>
    );
};

export default ProductDetail;