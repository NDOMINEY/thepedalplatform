import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";

const RegisterForm = () => {
    return (
        <Row>
            <Col className="my-auto py-2 p-md-2">
                <Container>
                    <h1>Register</h1>
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