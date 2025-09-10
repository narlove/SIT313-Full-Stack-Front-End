import { Form, Row, Col, Button, Container } from "react-bootstrap";

function ArticleForm() {
    return (
        <Form className="m-2">
            <Form.Group as={Row} className="m-0" controlId="titleInput">
                <Form.Label sm="auto" className="ps-0" column>Title</Form.Label>
                <Col className="p-0"><Form.Control type="text" placeholder="Enter your descriptive title" name="title" /></Col>
            </Form.Group>

            <Form.Group className="mt-4" controlId="thumbnail">
                <Form.Label>Add a thumbnail to your article:</Form.Label>
                <Form.Control type="file" name="image"></Form.Control>
            </Form.Group>

            <Form.Group className="mt-4">
                <Form.Label>Abstract</Form.Label>
                <Form.Control as="textarea" placeholder="Enter your 1-paragraph abstract" name="abstract" rows="3"></Form.Control>
            </Form.Group>

            <Form.Group className="mt-4">
                <Form.Label>Article Text</Form.Label>
                <Form.Control as="textarea" name="article" rows="7"></Form.Control>
            </Form.Group>

            <Form.Group as={Row} className="m-0 mt-3">
                <Form.Label column sm="auto">Tags</Form.Label>
                <Col className="p-0"><Form.Control placeholder="Please add up to 3 tags to describe what your post is about e.g., Java"></Form.Control></Col>
            </Form.Group>

            <Container fluid className="text-end p-0">
                <Button className="mt-5" variant="primary">Submit</Button>
            </Container>
        </Form>
    );
}

export default ArticleForm;