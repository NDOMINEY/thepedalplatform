import React, { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { Card, Form, FormControl } from "react-bootstrap";




const ProductsView = () => {

    const [product, setProduct] = useState({ results: [] });
    const [categories, setCategories] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [query, setQuery] = useState("");

    const handleCategory = (event) => {
        if (categories.includes(event.target.value)) {
            setCategories(categories.filter(
                (category) => category !== event.target.value));
        } else {
            setCategories(categories => [...categories, event.target.value]);
        }

        console.log(categories);

    };

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
                    placeholder="Search"
                    className="mr-sm-2" value={query}
                    onChange={(event) => setQuery(event.target.value)} />
                <Form.Check
                    id={'Octave'}
                    value='Octave'
                    label='Octave'
                    onChange={handleCategory}
                />
                <Form.Check
                    id={'Fuzz'}
                    value='Fuzz'
                    label='Fuzz'
                    onChange={handleCategory}
                />
                <Form.Check
                    id={'Chorus'}
                    value='Chorus'
                    label='Chorus'
                    onChange={handleCategory}
                />
                <Form.Check
                    id={'Looper'}
                    value='Looper'
                    label='Looper'
                    onChange={handleCategory}
                />
                <Form.Check
                    id={'Overdrive and Distortion'}
                    value='Overdrive and Distortion'
                    label='Overdrive and Distortion'
                    onChange={handleCategory}
                />
                <Form.Check
                    id={'Compressor'}
                    value='Compressor'
                    label='Compressor'
                    onChange={handleCategory}
                />
            </Form>

            {hasLoaded ? product.filter(function (product) {
                if (categories.length === 0) {
                    return product;
                } else {
                    return categories.includes(product.category);
                }

            }).map((product) => (

                <Card key={product.id} style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{product.brand}</Card.Subtitle>
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