import React, { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { Card, Form, FormControl } from "react-bootstrap";




const ProductsView = () => {

    const [product, setProduct] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchPedals = async () => {
            try {
                const { data } = await axiosReq.get(`/pedal/?search=${query}`);
                setProduct(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };
        setHasLoaded(false);
        fetchPedals();
    }, [query]);

    return (
        <div>
            <p>Products</p>
            <Form>
                <FormControl type="text"
                    placeholder="Search by product name"
                    className="mr-sm-2" value={query}
                    onChange={(event) => setQuery(event.target.value)} />
            </Form>

            {hasLoaded ? product.map((product) => (
                <Card key={product.id} style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{product.brand.brand}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">{product.price}</Card.Subtitle>
                    </Card.Body>
                </Card>
            )) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ProductsView;