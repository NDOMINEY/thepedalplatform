import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Row, Container, Form, Button, Alert } from "react-bootstrap";
import axios from 'axios';
import styles from '../styles/ProductDetail.module.css';


const RegisterForm = () => {
    const [registerData, setRegisterData] = useState({
        username: '',
        password1: '',
        password2: '',
    });
    const { username, password1, password2 } = registerData;

    const handleChange = (event) => setRegisterData({
        ...registerData,
        [event.target.name]: event.target.value
    });

    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/dj-rest-auth/registration/", registerData);
            history.push("/login");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    return (
        <Row>
            <Col className="my-auto py-2 p-md-2">
                <Container>
                    <h1>Register</h1>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name='username'
                                value={username}
                                onChange={handleChange} />
                        </Form.Group>
                        {errors.username?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <Form.Group className="mb-3" controlId="password1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password1"
                                value={password1}
                                onChange={handleChange} />
                        </Form.Group>
                        {errors.password1?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <Form.Group className="mb-3" controlId="password2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                name="password2"
                                value={password2}
                                onChange={handleChange} />
                        </Form.Group>
                        {errors.password2?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <Button className={styles.btn_review} variant="primary" type="submit">
                            Submit
                        </Button>
                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                    </Form>

                </Container>
                <Container>
                    <Link to="/login">
                        Already have an account? Sign in
                    </Link>
                </Container>
            </Col>
        </Row>
    );
};

export default RegisterForm;