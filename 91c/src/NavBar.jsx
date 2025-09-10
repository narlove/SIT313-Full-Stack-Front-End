import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet, Link } from 'react-router';
import { useUser } from './UserContext';
import { Button } from 'react-bootstrap';

export default function NavBar() {
    const { currentUser, setCurrentUser } = useUser();

    function logOut()
    {
        setCurrentUser(null);
    }

    return (
        <>
            <Navbar bg="light" className="py-2">
                <Container fluid className="d-flex justify-content-start justify-text-start">

                    <Navbar.Brand as={Link} to="/">DEV@Deakin</Navbar.Brand>

                    <Form className="mx-4">
                        <Form.Control
                            type="search"
                            placeholder="Search..."
                            aria-label="Search"
                        /> 
                    </Form>

                    <Nav>
                        <Nav.Link className="px-4" as={Link} to="/post">Post</Nav.Link>
                        <Nav.Link className="px-4" as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link className="px-4" as={Link} to="/findQuestion">Find Question</Nav.Link>
                    </Nav>

                    <Navbar.Text className='ms-auto me-2'>
                        {"Currently logged in: " + (currentUser ? currentUser.firstName : "anonymous")}
                    </Navbar.Text>
                    <Nav.Link className="px-4" href="#" onClick={logOut}>Logout</Nav.Link>
                </Container>
            </Navbar>

            <Outlet />
        </>
    );
}