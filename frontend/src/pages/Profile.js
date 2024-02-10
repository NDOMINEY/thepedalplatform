import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import { axiosReq } from "../api/axiosDefaults";
import styles from '../styles/Profile.module.css';
import loading from '../assets/loading.gif';





const Profile = () => {

    const { id } = useParams();

    const [profileData, setProfileData] = useState(null);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {

        const fetchProfile = async () => {
            try {
                const { data } = await axiosReq.get(`/profiles/${id}`);
                setProfileData(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        fetchProfile();

    }, [id]);

    return (
        <div>
            {hasLoaded ? 
                <>
                    <div className={styles.profile_container}>
                        <p>{profileData.owner}</p> 
                    </div>
                </> : 
                <>
                    <div className={styles.profile_container} >
                        <p>Loading</p>
                        <img src={loading} alt="loading"></img>
                    </div>
                </>}
        </div>
    );
};

export default Profile;