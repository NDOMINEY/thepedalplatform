import React, { useState } from "react";
import styles from '../styles/ProductDetail.module.css';
import { Modal, Button } from "react-bootstrap";



function ReviewDisplay(props) {

    const [modalStatus, setModalStatus] = useState(false);


    // Modal for delete confirmation pop up

    function DeleteModal() {
        setModalStatus(modalStatus => !modalStatus);
    }

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
                                <Button variant="primary">Delete</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </div>
                </> : null}
        </div>

    );
}

export default ReviewDisplay;;;