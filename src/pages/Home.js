import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap';
import categories from "../categories";
import './Home.css';
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";

function HomePage() {
    const dispatch = useDispatch();
    const products = useSelector(state=>state.products);
    const lastProducts = products.slice(0,8)
    useEffect(()=>{
        axios.get('/products').then(({data})=>dispatch(updateProducts(data)));
    },[]);
    return (
        <div>
            <img src=
            "https://media.istockphoto.com/vectors/internet-shopping-concept-on-computer-vector-id1257044925?k=20&m=1257044925&s=612x612&w=0&h=i5o_jMdPNHcSvHdatsPOrHWafQgVMmAAHXhdiprFqb4=" 
            className="homeimage"
             />
            <div className="products-container mt-4">
                <h2>Last products</h2>
                <div className="d-flex justify-content-center flex-wrap">
                {lastProducts.map((product)=>(
                    <ProductPreview {...product}/>
                ))}
                </div>
                <div>
                    <Link to="/category/all" style={{ textAlign: "right", display: "block", textDecoration: "none" }}>See more{">>"}</Link>
                </div>
            </div>

            <div className="sale-banner-container mt-4">
                <img src="https://www.ataly.com/wp-content/uploads/2016/09/tech-banner-1.jpg" />
            </div>
            <div className="recent-products-container mt-4">
                <h2>Categories</h2>
                <Row>
                    {categories.map((category) => (
                        <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
                            <Col md={4}>
                                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})` }} className="category-tile">
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
            </div>
        </div>
    )
}

export default HomePage;