import React from "react";
import Container from 'react-bootstrap/Container';
import { Alert, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router";

export default function Register({ persistenceLayer }) {
    const navigate = useNavigate();

    async function handleSubmit(formData) {
        // https://react.dev/reference/react-dom/components/form#handle-form-submission-on-the-client
        const firstName = formData.get("firstName");
        const surname = formData.get("surname");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        if (!firstName || !surname || !email || !password || !confirmPassword) {
            alert("All fields are required");
            return;
        }

        if (confirmPassword !== password) {
            alert("Your password must match the confirm password field");
            return;
        }

        // writedata will literally just overwrite anything so we need
        // to make sure it doesnt do that without good cause
        const userExists = await persistenceLayer.doesUserExist(email)

        if (userExists) {
            alert("that user already exists. please login instead.");
            navigate("/login");
            return;
        }

        try {
            persistenceLayer.writeData("users/", email, {
                firstName: firstName,
                lastName: surname,
                password: password
            });
        } catch (err) {
            console.error(err);
            alert("an error occured. please try again.");
            return;
        }

        alert("registration successful");
        navigate("/login");
    }

    return (
        <>
            <Container fluid className="px-4">
                <h3 className="mt-2">Create a DEV@Deakin account</h3>

                {/* see validation techniques https://react-bootstrap.netlify.app/docs/forms/validation */}
                <Form action={handleSubmit}>
                    <Form.Group controlId="firstName" className="py-2 my-2">
                        <Form.Label>*Full name</Form.Label>
                        <Form.Control name="firstName" type="text" placeholder="Enter first name" className="w-25" />
                    </Form.Group>

                    <Form.Group controlId="surname" className="py-2 my-2">
                        <Form.Label>*Last name</Form.Label>
                        <Form.Control name="surname" type="text" placeholder="Enter last name" className="w-25" />
                    </Form.Group>

                    <Form.Group controlId="email" className="py-2 my-2">
                        <Form.Label>*Email address</Form.Label>
                        <Form.Control name="email" type="email" placeholder="Enter email" className="w-25" />
                    </Form.Group>

                    <Form.Group controlId="password" className="py-2 my-2">
                        <Form.Label>*Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Enter password" className="w-25" />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword" className="py-2 my-2">
                        <Form.Label>*Confirm password</Form.Label>
                        <Form.Control name="confirmPassword" type="password" placeholder="Re-enter your password" className="w-25" />
                    </Form.Group>

                    <p className="mt-2 mb-0">
                        <Link to="/login" className="text-decoration-none text-body-secondary">Already have an account? <span className="text-primary">Login now</span></Link>
                    </p>

                    <Button variant="primary" type="login" className="my-2">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    );
}   