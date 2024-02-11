import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../api/axiosDefaults";

const Favourite = () => {
  const { id } = useParams();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosReq.get(`/favourite/?owner=${id}`);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    setHasLoaded(false);
    fetchProfile();
  }, [id]);

  return <></>;
};

export default Favourite;
