import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { axiosReq } from "../api/axiosDefaults";
import styles from "../styles/Profile.module.css";
import loading from "../assets/loading.gif";
import {
  Row,
  Col,
  Container,
  Form,
  Image,
  Alert,
  Button,
} from "react-bootstrap";

const Profile = () => {
  const { id } = useParams();

  const [profileData, setProfileData] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState();

  const imageFile = useRef();
  const [editProfile, setEditProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}`);
        var { name, about, picture } = data;

        setProfileData({ name, about, picture });
        setEditProfile({ name, about });

        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchProfile();
  }, [id]);

  const handleChange = (event) => {
    setEditProfile({
      ...editProfile,
      [event.target.name]: event.target.value,
    });
  };

  const handleProfileImageSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (imageFile?.current?.files[0]) {
      formData.append("picture", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}`, formData);

      try {
        const { data } = await axiosReq.get(`/profiles/${id}`);
        var { name, about, picture } = data;

        setProfileData({ name, about, picture });
        setEditProfile({ name, about });

        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }

      setMessage("Profile Updated!");
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  const handleTextSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`/profiles/${id}`, editProfile);
      setMessage("Profile updated");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <div>
      {message ? <Alert variant="info">{message}</Alert> : null}

      {hasLoaded ? (
        <>
          <section className={styles.content_container}>
            <Container className={styles.info_container}>
              <h1>My Profile</h1>
              <Row>
                <Col sm={12} md={6} lg={4} className={styles.profiletext_edit}>
                  <Form onSubmit={handleProfileImageSubmit}>
                    <Form.Group>
                      <figure id={styles.profile_edit_img}>
                        <Image
                          id={styles.profile_img_sizing}
                          src={profileData.picture}
                          width="250"
                          heigth="250"
                          roundedCircle
                        />
                      </figure>

                      <Form.Label htmlFor="picture-upload">
                        Change profile image
                      </Form.Label>
                      <Form.Control
                        type="file"
                        size="sm"
                        id="picture-upload"
                        ref={imageFile}
                        accept="picture/*"
                        onChange={(e) => {
                          if (e.target.files.length) {
                            setEditProfile({
                              ...setEditProfile,
                              picture: URL.createObjectURL(e.target.files[0]),
                            });
                          }
                        }}
                      />
                    </Form.Group>
                    <Button className={styles.btn_profile} type="submit">
                      Update Image
                    </Button>
                  </Form>
                </Col>

                <Col className={styles.profiletext_edit}>
                  <Form onSubmit={handleTextSubmit}>
                    <Form.Group>
                      <Form.Label>Name:</Form.Label>

                      {editProfile.name === "undefined" ? (
                        <>
                          <Form.Control
                            type="textarea"
                            placeholder="Please add your name here"
                            name="name"
                            onChange={handleChange}
                          />
                        </>
                      ) : (
                        <>
                          <Form.Control
                            type="textarea"
                            placeholder="Please add your name here."
                            name="name"
                            value={editProfile.name}
                            onChange={handleChange}
                          />
                        </>
                      )}
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>About:</Form.Label>

                      {editProfile.about === "undefined" ? (
                        <>
                          <Form.Control
                            id={styles.about_input}
                            as="textarea"
                            placeholder="Please add a little about yourself here"
                            name="about"
                            onChange={handleChange}
                          />
                        </>
                      ) : (
                        <>
                          <Form.Control
                            id={styles.about_input}
                            as="textarea"
                            placeholder="Please add a little about yourself here"
                            name="about"
                            value={editProfile.about}
                            onChange={handleChange}
                          />
                        </>
                      )}
                    </Form.Group>

                    {errors?.name?.map((message, idx) => (
                      <Alert variant="warning" key={idx}>
                        {message}
                      </Alert>
                    ))}
                    <Button className={styles.btn_profile} type="submit">
                      Update Profile
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </section>
        </>
      ) : (
        <>
          <div className={styles.content_container}>
            <p>Loading</p>
            <img src={loading} alt="loading"></img>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
