import React, { useState, useEffect, useContext, } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";
import axios from 'axios';
import { Form, Button, Alert } from "react-bootstrap";
import styles from '../styles/ProductDetail.module.css';
import loading from '../assets/loading.gif';
import ReviewDisplay from '../components/ReviewDisplay';
import { CurrentUserContext } from "../contexts/CurrentUserContext";



const ProductDetail = () => {

    const { id } = useParams();
    const [pedalDetail, setPedal] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const currentUser = useContext(CurrentUserContext);


    const [reviews, setReviews] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: pedalDetail }, { data: review }] = await Promise.all([
                    axiosReq.get(`/pedal/${id}`),
                    axiosReq.get(`/review/?pedal=${id}`),
                ]);
                setPedal({ results: [pedalDetail] });
                setReviews(review);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        handleMount();
    }, [id]);

    // Review form data handling

    const [reviewData, setReviewData] = useState({
        pedal: id,
        content: '',
        rate: '',
    });


    const [message, setMessage] = useState();

    const { content, rate } = reviewData;

    const handleChange = (event) => setReviewData({
        ...reviewData,
        [event.target.name]: event.target.value
    });

    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/review/", reviewData);
            setReviewData(reviewData => ({
                ...reviewData,
                content: '',
                rate: '',
            }));

            try {
                const [{ data: review }] = await Promise.all([
                    axiosReq.get(`/review/?pedal=${id}`),
                ]);
                setReviews(review);
                setMessage("Review added!");
                setHasLoaded(false);
                console.log(message);


            } catch (err) {
                console.log(err);
            }
        } catch (err) {
            setErrors(err.response?.data);
        }
    };


    return (
        <>
            {message ?
                <Alert variant="info" >
                    {message}
                </Alert> : null}

            <section>
                <Link to="/products">
                    <button className={styles.btn}>
                        &#8592; The Pedal Inventory</button>
                </Link>
            </section>

            <section>
                {hasLoaded ? pedalDetail.results.map((product) => (
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
                        <div className={styles.product_items} >
                            <p className={styles.loading_text}>Loading</p>
                            <img src={loading} alt="loading"></img>
                        </div>
                    </div>
                )}
            </section>

            <section>
                {hasLoaded && currentUser ?
                    <>
                        < Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="content">
                                <Form.Label>Please leave a review:</Form.Label>
                                <Form.Control
                                    type="textarea"
                                    placeholder="Please detail your review here."
                                    name='content'
                                    value={content}
                                    onChange={handleChange} />
                            </Form.Group>
                            {errors.review_comments?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                            <Form.Group className="mb-3" controlId="rate">
                                <Form.Label>Rating (1 to 5)</Form.Label>
                                <Form.Control
                                    type="number"
                                    maxLength="10"
                                    placeholder="5"
                                    name="rate"
                                    value={rate}
                                    onChange={handleChange} />
                            </Form.Group>
                            {errors.rating?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                            <Button className={styles.btn_review} type="submit">
                                Submit
                            </Button>
                            {errors.non_field_errors?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                        </Form>
                    </>
                    : hasLoaded ?
                        <>
                            <div className={styles.info_container}>
                                <p>Please login to leave a review &rarr;</p>
                                <Link className={styles.login_link} to="/login">
                                    Login
                                </Link>
                            </div>
                        </> : null}
            </section>

            <section>
                {hasLoaded ? (reviews.length ? reviews.map((review) => (
                    < ReviewDisplay key={review.id} id={review.id} rate={review.rate}
                        owner={review.owner} created_at={review.created_at}
                        content={review.content} is_owner={review.is_owner}
                        setHasLoaded={setHasLoaded} setMessage={setMessage} />
                )) : (
                    <div className={styles.review_container}>
                        <p>No Reviews</p>
                    </div>
                )) : null
                }
            </section>
        </>
    );
};

export default ProductDetail;