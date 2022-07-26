import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSignupMutation } from "../services/appApi";
import './Signup.css';

function Signup(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signup, {error, isLoading, isError}] = useSignupMutation();

    function handleSignup(e){
      e.preventDefault();
      signup({name,email,password});
    }
    return(
        <Container>
            <Row>
                <Col md={6} className="signup__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSignup}>
                        <h1>Create an account</h1>
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your Name"
                                value={name}
                                required 
                                onChange={(e)=>setName(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your Email"
                                value={email}
                                required 
                                onChange={(e)=>setEmail(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                required 
                                onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group>
                            <Button type="submit" disabled={isLoading} className="login">Sign up</Button>
                        </Form.Group>
                        <span>Already Registered! </span><Link to="/login">Click here to Login</Link>
                    </Form>
                </Col>
                <Col md={6} className="signup__image--container"></Col>
            </Row>
        </Container>
    )
}

export default Signup;