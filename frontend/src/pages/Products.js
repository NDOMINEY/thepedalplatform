import React, { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { Form, FormControl } from "react-bootstrap";
import styles from '../styles/ProductList.module.css';




const ProductsView = () => {

    const [product, setProduct] = useState({ results: [] });
    const [categories, setCategories] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [search, setSearch] = useState("");
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

    const handleSubmit = (event) => {
        event.preventDefault();
        setQuery(search);
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
        <div className={styles.product_container}>
            <section className={styles.product_filter}>

                <h4>Search and Filter</h4>
                <hr></hr>

                <p>Select category:</p>

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

                <hr></hr>
                <p>Search by name or brand:</p>

                <Form onSubmit={handleSubmit}>
                    <FormControl type="text"
                        placeholder="Type here..."
                        className="mr-sm-2"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)} />
                    <button className={styles.btn} type="submit">
                        Search
                    </button>
                </Form>
            </section>

            <section className={styles.product_title}>
                <h1>
                    The Pedal Inventory!
                </h1>       
            </section>  

            <section className={styles.product_list}>

                {hasLoaded ? product.filter(function (product) {
                    if (categories.length === 0) {
                        return product;
                    } else {
                        return categories.includes(product.category);
                    }
                }).map((product) => (

                    <div className={styles.product_items} key={product.id}>

                        <h6 className={styles.name_color}>{product.name}</h6>
                        <h6 className={styles.brand_color}>{product.brand}</h6>
                        <h6 className={styles.price_color}>{product.price}</h6>

                        <div className={styles.pedal_light}>
                        </div>

                        <div>
                            <button className={styles.pedal_button}></button>
                        </div>
                    </div>

                )) : (
                    <p>Loading...</p>
                )}
            </section>
        </div>
    );
};

export default ProductsView;