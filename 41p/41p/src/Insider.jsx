import React from "react";
import { Col, Container, FormGroup, Row, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

function Insider()
{
    return (
        <Container fluid className="py-3" style={{backgroundColor: "lightgrey"}}>
            <Row>
                <Col xs="6" md="5" className="text-center">
                    <span style={{fontSize: "35px"}}>SIGN UP FOR OUR DAILY INSIDER</span>
                </Col>
                <Col xs="3" md="5" lg="6" className="py-2">
                    <Form>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Enter your email"></Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md="1" xs="2" className="d-flex justify-content-center">
                    <Button variant="danger">Subscribe</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Insider;