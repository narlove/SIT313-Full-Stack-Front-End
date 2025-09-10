import React from "react";
import Container from 'react-bootstrap/Container';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router";
import { usePersistence } from "./PersistenceContext";
import { useUser } from "./UserContext";

export default function Login() {
    const navigate = useNavigate();
    const persistenceLayer = usePersistence();
    const { setCurrentUser } = useUser();

    async function handleSubmit(formData) {
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) return;

        try {
            // async await for literally everything that has handled this password match function
            // because interacting with firebase returns a promise
            const isMatch = await persistenceLayer.isPasswordMatch(email, password);
            
            // react router
            if (isMatch) {
                const loggedInData = await persistenceLayer.readData("users", email);

                if (!loggedInData) {
                    console.error("an error occured while retrieving user information from the database");
                    navigate("/");
                }

                setCurrentUser({
                    firstName: loggedInData.firstName,
                    surname: loggedInData.lastName,
                    email: email
                });

                alert("login successful");
                navigate('/');
            } else {
                alert("username and password do not match");
            }
        } catch (error) {
            alert("an error occured. try again");
            console.error("err:", error);
        }
    }

    return (
        <>
            <Container fluid className="px-4">
                <h3 className="mt-2">Login to DEV@Deakin</h3>

                <Form action={handleSubmit}>
                    <Form.Group controlId="email" className="py-2 my-2">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" className="w-25" />
                    </Form.Group>

                    <Form.Group controlId="password" className="py-2 my-2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Enter password" className="w-25" />
                    </Form.Group>

                    <p className="mt-2 mb-0">
                        <Link to="/register" className="text-decoration-none text-body-secondary">Not a member yet? <span className="text-primary">Register now</span></Link>
                    </p>

                    <Button variant="primary" type="login" className="my-2">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    );
}