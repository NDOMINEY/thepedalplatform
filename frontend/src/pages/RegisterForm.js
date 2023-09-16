import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container, Form, Button } from "react-bootstrap";

const RegisterForm = () => {
    return (
        <Row>
            <Col className="my-auto py-2 p-md-2">
                <Container>
                    <h1>Register</h1>

                    <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password1" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                name="password2" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
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