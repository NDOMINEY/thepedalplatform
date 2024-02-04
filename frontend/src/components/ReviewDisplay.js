import React from 'react';
import styles from '../styles/ProductDetail.module.css';


function ReviewDisplay(props) {

    return (
        < div className={styles.review_container} key={props.id} >
            <span>Rating: {props.rate}/5</span>

            <span>User: {props.owner}</span>
            <span>Created on: {props.created_at}</span>

            {props.is_owner ?
                <>
                    <button>Edit</button>
                    <button>Delete</button>
                </> : null}

            <p>{props.content}</p>
        </div>

    );
}

export default ReviewDisplay;;;