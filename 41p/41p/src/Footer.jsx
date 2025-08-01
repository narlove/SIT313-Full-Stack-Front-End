import React from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";

function Footer() {
    return (
        <div className="mt-3 p-5" style={{ backgroundColor: "darkcyan" }}>
            <Container >
                <Row>
                    <Col>
                        <Stack>
                            <div className="h3">Explore</div>
                            <div className="p-1">Home</div>
                            <div className="p-1">Questions</div>
                            <div className="p-1">Articles</div>
                            <div className="p-1">Tutorials</div>
                        </Stack>
                    </Col>
                    <Col>
                        <Stack>
                            <div className="h3">Support</div>
                            <div className="p-1">FAQs</div>
                            <div className="p-1">Help</div>
                            <div className="p-1">Contact us</div>
                        </Stack>
                    </Col>
                    <Col>
                        <h3>Stay connected</h3>
                        <h2 className="d-inline-flex px-2"><i className="bi bi-facebook"></i></h2>
                        <h2 className="d-inline-flex px-2"><i className="bi bi-instagram"></i></h2>
                        <h2 className="d-inline-flex px-2"><i className="bi bi-twitter"></i></h2>
                    </Col>
                </Row>
            </Container>

            <h2 className="text-center m-2 mb-4">DEV@DEAKIN 2025</h2>
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col className="text-center" md="3">Privacy policy</Col>
                    <Col className="text-center" md="3">Terms</Col>
                    <Col className="text-center" md="3">Code of conduct</Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;