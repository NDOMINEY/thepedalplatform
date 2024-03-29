import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Row, Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import stylesBTN from "../styles/ProductDetail.module.css";
import styles from "../styles/LoginRegister.module.css";

import { SetCurrentUserContext } from "../contexts/CurrentUserContext";

const LoginForm = () => {
  const setCurrentUser = useContext(SetCurrentUserContext);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginData;

  const handleChange = (event) =>
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });

  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", loginData);
      setCurrentUser(data.user);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row className={styles.login_register_container}>
      <Col className="my-auto py-2 p-md-2">
        <Container>
          <h1>Login</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Button className={stylesBTN.btn_review} type="submit">
              Login
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container>
          <Link to="/register">Don't have an account? Register</Link>
        </Container>
      </Col>
    </Row>
  );
};

export default LoginForm;
