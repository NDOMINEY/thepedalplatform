import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import styles from '../styles/ProductDetail.module.css';



const ProductDetail = () => {
    // const currentUser = useContext(CurrentUserContext);

    const { id } = useParams();
    const [pedal, setPedal] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    const [reviews, setReviews] = useState({ results: [] });

    console.log(reviews);

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: pedal }, { data: review }] = await Promise.all([
                    axiosReq.get(`/pedal/${id}`),
                    axiosReq.get(`/review/?pedal=${id}`),
                ]);
                setPedal({ results: [pedal] });
                setReviews(review);
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
                    <div className={styles.info_container}>
                        <p>Loading...</p>
                    </div>
                )}
            </section>

            <section>
                {hasLoaded ? (reviews.length ? reviews.map((review) => (
                    <div className={styles.review_container} key={review.id}>
                        <span>Rating: {review.rate}/5</span>

                        <span>User: {review.owner}</span>
                        <span>Created on: {review.created_at}</span>
                        <p>{review.content}</p>
                    </div>
                )) : (
                    <p>No Reviews</p>
                )) : null
                }
            </section>
        </>
    );
};

export default ProductDetail;