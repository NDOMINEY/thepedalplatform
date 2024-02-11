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

  console.log(profileData);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/${id}`);
        var { name, about, picture } = data;

        console.log(data);
        console.log(name);
        console.log(about);
        console.log(picture);

        setProfileData({ name, about, picture });
        setEditProfile({ name, about, picture });

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

  const handleEdit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", editProfile.name);
    formData.append("about", editProfile.about);

    if (imageFile?.current?.files[0]) {
      formData.append("picture", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}`, formData);
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <div>
      {hasLoaded ? (
        <>
          <Container>
            <Row xs={2} md={4} lg={6}>
              <Col>1 of 3</Col>
            </Row>
          </Container>

          <Form onSubmit={handleEdit}>
            <Row>
              <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
                <Container>
                  <Form.Group>
                    <figure>
                      <Image src={editProfile.picture} fluid />
                    </figure>
                    <div>
                      <Form.Label htmlFor="image-upload">
                        Change the image
                      </Form.Label>
                    </div>
                    <Form.File
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
                  {errors?.content?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                      {message}
                    </Alert>
                  ))}
                  <Button type="submit">Save</Button>
                </Container>
              </Col>
            </Row>
          </Form>
        </>
      ) : (
        <>
          <div className={styles.profile_container}>
            <p>Loading</p>
            <img src={loading} alt="loading"></img>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
