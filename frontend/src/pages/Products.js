import React, { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { Form, FormControl, Row, Col } from "react-bootstrap";
import styles from "../styles/ProductList.module.css";
import { Link } from "react-router-dom";
import loading from "../assets/loading.gif";

const ProductsView = () => {
  const [product, setProduct] = useState({ results: [] });
  const [categories, setCategories] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [filteringStyles, setFilteringStyles] = useState(false);

  const toggleFilteringDisplay = (event) => {
    setFilteringStyles((filteringStyles) => !filteringStyles);
  };

  const handleCategory = (event) => {
    if (categories.includes(event.target.value)) {
      setCategories(
        categories.filter((category) => category !== event.target.value)
      );
    } else {
      setCategories((categories) => [...categories, event.target.value]);
    }
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

  // scroll to top

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div className={styles.product_container}>
      <Row>
        <Col xs={12} md={3}>
          <section className={styles.product_filter}>
            <h4>Search and Filter</h4>
            <button
              onClick={toggleFilteringDisplay}
              id={styles.filtering_btn}
              className={styles.btn}
            >
              {filteringStyles ? <>Show Filtering</> : <>Hide Filtering</>}
            </button>

            <hr></hr>
            <div style={{ display: filteringStyles ? "none" : "" }}>
              <p>Select category:</p>
              <div className={styles.category_list}>
                <Form.Check
                  className={styles.product_check}
                  id={"Octave"}
                  value="Octave"
                  label="Octave"
                  onChange={handleCategory}
                />
                <Form.Check
                  className={styles.product_check}
                  id={"Fuzz"}
                  value="Fuzz"
                  label="Fuzz"
                  onChange={handleCategory}
                />
                <Form.Check
                  className={styles.product_check}
                  id={"Chorus"}
                  value="Chorus"
                  label="Chorus"
                  onChange={handleCategory}
                />
                <Form.Check
                  className={styles.product_check}
                  id={"Looper"}
                  value="Looper"
                  label="Looper"
                  onChange={handleCategory}
                />
                <Form.Check
                  className={styles.product_check}
                  id={"Overdrive and Distortion"}
                  value="Overdrive and Distortion"
                  label="Overdrive and Distortion"
                  onChange={handleCategory}
                />
                <Form.Check
                  className={styles.product_check}
                  id={"Compressor"}
                  value="Compressor"
                  label="Compressor"
                  onChange={handleCategory}
                />
              </div>

              <hr></hr>
              <p>Search by name or brand:</p>

              <Form onSubmit={handleSubmit}>
                <FormControl
                  type="text"
                  placeholder="Type here..."
                  className="mr-sm-2"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <button className={styles.btn} type="submit">
                  Search
                </button>
              </Form>
            </div>
          </section>
        </Col>
        <Col>
          <section className={styles.product_title}>
            <h1>The Pedal Inventory!</h1>
          </section>

          <section className={styles.product_list}>
            {hasLoaded ? (
              product
                .filter(function (product) {
                  if (categories.length === 0) {
                    return product;
                  } else {
                    return categories.includes(product.category);
                  }
                })
                .map((product) => (
                  <Link to={`/products/${product.id}`} key={product.id}>
                    <div className={styles.product_items}>
                      <h6 className={styles.name_color}>{product.name}</h6>
                      <h6 className={styles.brand_color}>{product.brand}</h6>
                      <h6 className={styles.price_color}>{product.price}</h6>

                      <div className={styles.pedal_light}></div>

                      <div>
                        <button className={styles.pedal_button}></button>
                      </div>
                    </div>
                  </Link>
                ))
            ) : (
              <div className={styles.product_items}>
                <p className={styles.loading_text}>Loading</p>
                <img src={loading} alt="loading"></img>
              </div>
            )}
          </section>
        </Col>
      </Row>
      <button
        className={styles.btn_scroll}
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      >
        Back to top!
      </button>
    </div>
  );
};

export default ProductsView;
