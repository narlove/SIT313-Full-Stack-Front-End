import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { usePersistence } from "./PersistenceContext";
import { useNavigate } from "react-router";

function QuestionForm() {
    const navigate = useNavigate();
    const persistence = usePersistence();

    async function handleSubmit(formData)
    {
        const title = formData.get("title"); // required
        const thumbnail = formData.get("thumbnail"); // optional
        const desc = formData.get("description"); // required
        const tagsCsv = formData.get("tags"); // required

        const date = new Date().toLocaleDateString();

        if (!title || !desc || !tagsCsv)
        {
            alert("Please ensure you fill out all of the required fields: title, description, tags.");
            return;
        }

        if (thumbnail && thumbnail.size > 0) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            const maxSize = 5 * 1024 * 1024; // 5MB
            
            if (!allowedTypes.includes(thumbnail.type)) {
                alert("Please upload a valid image file (JPEG, PNG, GIF, or WebP).");
                return;
            }
            
            if (thumbnail.size > maxSize) {
                alert("Image file size must be less than 5MB.");
                return;
            }
        }

        // convert tags from csv to a list
        const tags = tagsCsv.split(",").map(val => val.trim());
        if (tags.length > 3)
        {
            alert("You are only allowed up to three tags.");
            return;    
        } else if (tags.length < 1)
        {
            alert("Please add at least one tag to identify your question.");
            return;
        }

        const imageId = await persistence.uploadImage(thumbnail);

        // upload to firestore database
        // its occured to me that this is awful practice and super unintuitative to
        // just have general add methods and not break down the parameters,
        // but that's a problem for a later dev
        await persistence.writeDataNoKey("questions", {
            title: title,
            thumbnailRef: imageId,
            description: desc,
            tags: tags,
            date: date
        });

        alert("question submission successful");
    }

    return (
        <Form action={handleSubmit} className="m-2">
            <Form.Group as={Row} className="m-0" controlId="titleInput">
                <Form.Label className="ps-0" sm="auto" column>Title</Form.Label>
                <Col className="p-0"><Form.Control type="text" placeholder="Start your question with how, what, why, etc." name="title" /></Col>
            </Form.Group>

            <Form.Group className="mt-4" controlId="thumbnail">
                <Form.Label>Add an thumbnail to your question:</Form.Label>
                <Form.Control type="file" name="thumbnail" accept="image/*"></Form.Control>
            </Form.Group>

            <Form.Group className="mt-4">
                <Form.Label>Describe your problem</Form.Label>
                <Form.Control as="textarea" name="description" rows="7"></Form.Control>
            </Form.Group>

            <Form.Group as={Row} className="mt-3 m-0">
                <Form.Label className="ps-0" column sm="auto">Tags</Form.Label>
                <Col className="p-0"><Form.Control name="tags" placeholder="Please add up to 3 tags, separated with a comma, to describe what your post is about e.g., 'Java, Maven, Compiling'"></Form.Control></Col>
            </Form.Group>

            <Container fluid className="text-end p-0">
                <Button className="mt-5" type="submit" variant="primary">Submit</Button>
            </Container>
        </Form>
    );
}

export default QuestionForm;