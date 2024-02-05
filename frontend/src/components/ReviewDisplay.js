import React, { useState } from "react";
import styles from '../styles/ProductDetail.module.css';
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import { Alert } from "react-bootstrap";




function ReviewDisplay(props) {

    const [modalStatus, setModalStatus] = useState(false);
    const [errors, setErrors] = useState({});

    const setHasLoaded = props.setHasLoaded;
    const setMessage = props.setMessage;


    // Modal for delete confirmation pop up

    function DeleteModal() {
        setModalStatus(modalStatus => !modalStatus);
    }

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

    return (
        < div className={styles.review_container} key={props.id} >
            <span>Rating: {props.rate}/5</span>

            <span>User: {props.owner}</span>
            <span>Created on: {props.created_at}</span>

            {props.is_owner ?
                <>
                    <button>Edit</button>
                    <button onClick={DeleteModal}>Delete</button>
                </> : null}

            <p>{props.content}</p>

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