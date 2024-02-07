import React, { useState } from "react";
import styles from '../styles/ProductDetail.module.css';
import { Modal, Form, Button, Alert } from "react-bootstrap";
import axios from 'axios';




function ReviewDisplay(props) {

    const [modalStatus, setModalStatus] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [editComplete, setEditComplete] = useState(false);


    const [amendReviewData, setAmendReviewData] = useState({
        content: props.content,
        rate: props.rate,
    });



    const [errors, setErrors] = useState({});

    const setHasLoaded = props.setHasLoaded;
    const setMessage = props.setMessage;

    // Modal for delete confirmation pop up

    function DeleteModal() {
        setModalStatus(modalStatus => !modalStatus);
    };

    function EditStatusSetter() {
        setEditStatus(editStatus => !editStatus);
    };

    const handleChange = (event) => setAmendReviewData({
        ...amendReviewData,
        [event.target.name]: event.target.value
    });

    const handleDelete = async () => {
        try {
            await axios.delete(`/review/${props.id}`);
            setMessage("Review deleted");
            setHasLoaded(false);

        } catch (err) {
            setErrors(err.response?.data);
        }

        DeleteModal();

    };

    const handleEdit = async (event) => {
        event.preventDefault();

        try {
            await axios.patch(`/review/${props.id}`, amendReviewData);
            setMessage("Review updated");
            EditStatusSetter();
            setEditComplete(true);

        } catch (err) {
            setErrors(err.response?.data);
        }

    };


    return (
        < div className={styles.review_container} key={props.id} >
            {editComplete ?
                <>
                    <span>Rating: {amendReviewData.rate}/5</span>

                    <span>User: {props.owner}</span>
                    <span>Created on: {props.created_at}</span>

                    {props.is_owner ?
                        <>
                            <button className={styles.btn_review} onClick={EditStatusSetter}>Edit</button>
                            <button className={styles.btn_review} onClick={DeleteModal}>Delete</button>
                        </> : null}

                    {editStatus ?
                        <>
                            < Form>
                                <Form.Group className="mb-3" controlId="content">
                                    <Form.Label>Review Edit:</Form.Label>
                                    <Form.Control
                                        type="textarea"
                                        placeholder="Please detail your review here."
                                        name='content'
                                        value={amendReviewData.content}
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
                                        value={amendReviewData.rate}
                                        onChange={handleChange} />
                                </Form.Group>
                                {errors.rating?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                                <Button className={styles.btn_review} onClick={handleEdit} type="submit">
                                    Update
                                </Button>
                                <Button className={styles.btn_review} onClick={EditStatusSetter} type="submit">
                                    Cancel
                                </Button>

                                {errors.non_field_errors?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                            </Form>


                        </> :
                        <>
                            <p>{amendReviewData.content}</p>
                        </>}

                </> :
                <>
                    <span>Rating: {props.rate}/5</span>

                    <span>User: {props.owner}</span>
                    <span>Created on: {props.created_at}</span>

                    {props.is_owner ?
                        <>
                            <button className={styles.btn_review} onClick={EditStatusSetter}>Edit</button>
                            <button className={styles.btn_review} onClick={DeleteModal}>Delete</button>
                        </> : null}

                    {editStatus ?
                        <>
                            < Form>
                                <Form.Group className="mb-3" controlId="content">
                                    <Form.Label>Review Edit:</Form.Label>
                                    <Form.Control
                                        type="textarea"
                                        placeholder="Please detail your review here."
                                        name='content'
                                        value={amendReviewData.content}
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
                                        value={amendReviewData.rate}
                                        onChange={handleChange} />
                                </Form.Group>
                                {errors.rating?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                                <Button className={styles.btn_review} onClick={handleEdit} type="submit">
                                    Update
                                </Button>
                                <Button className={styles.btn_review} onClick={EditStatusSetter} type="submit">
                                    Cancel
                                </Button>

                                {errors.non_field_errors?.map((message, idx) => (
                                    <Alert variant="warning" key={idx}>
                                        {message}
                                    </Alert>
                                ))}
                            </Form>


                        </> :
                        <>
                            <p>{props.content}</p>
                        </>}
                </>
            }


            {modalStatus ?
                <>
                    <div
                        className="modal show"
                        style={{ display: 'block', position: 'initial' }}
                    >
                        <Modal.Dialog>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Review</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p>Are you sure you would like to delete your review?</p>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button onClick={DeleteModal} variant="secondary">Cancel</Button>
                                <Button onClick={handleDelete} variant="primary">Delete</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                </> : null}

            {errors.review_comments?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
        </div>

    );
}

export default ReviewDisplay;;;