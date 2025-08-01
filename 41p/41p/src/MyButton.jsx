import React from "react";
import { Button } from "react-bootstrap";
import { Container } from 'react-bootstrap';

function MyButton(props) {
    return (
        <Container fluid className="py-4 d-flex justify-content-center">
            <Button variant="primary" size="lg">{"View All " + (props.section ?? "404")}</Button>
        </Container>
    );
}

export default MyButton;