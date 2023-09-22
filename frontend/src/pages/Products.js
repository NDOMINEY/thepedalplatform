import React, { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";



const ProductsView = () => {

    const [product, setProduct] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);

    console.log(product);
    console.log(hasLoaded);
    console.log(product);



    useEffect(() => {
        const fetchPedals = async () => {
            try {
                const { data } = await axiosReq.get(`/pedal/`);
                setProduct(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        fetchPedals();
    }, []);

    return (
        <div>
            <p>Products</p>
            {hasLoaded ? product.map((product) => (
                <p>{product.name}</p>
            )) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductsView;