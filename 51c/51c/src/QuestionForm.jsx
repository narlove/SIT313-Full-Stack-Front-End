import { Form, Row, Col, Container, Button } from "react-bootstrap";

function QuestionForm() {
    return (
        <Form className="m-2">
            <Form.Group as={Row} className="m-0" controlId="titleInput">
                <Form.Label className="ps-0" sm="auto" column>Title</Form.Label>
                <Col className="p-0"><Form.Control type="text" placeholder="Start your question with how, what, why, etc." name="title" /></Col>
            </Form.Group>

            <Form.Group className="mt-4">
                <Form.Label>Describe your problem</Form.Label>
                <Form.Control as="textarea" name="problem" rows="7"></Form.Control>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 m-0">
                <Form.Label className="ps-0" column sm="auto">Tags</Form.Label>
                <Col className="p-0"><Form.Control placeholder="Please add up to 3 tags to describe what your post is about e.g., Java"></Form.Control></Col>
            </Form.Group>

            <Container fluid className="text-end p-0">
                <Button className="mt-5" variant="primary">Submit</Button>
            </Container>
        </Form>
    );
}

export default QuestionForm;