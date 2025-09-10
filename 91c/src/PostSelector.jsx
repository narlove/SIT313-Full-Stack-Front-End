import { Form, FormGroup } from "react-bootstrap";

function PostSelector({ setState }) {

    return (
        <div className="mx-2 mb-4">
            <Form>
                <span>Select Post Type: </span>
                <Form.Check className="mx-2" inline label="Question" type="radio" name="posttype" id="question" 
                    defaultChecked onClick={() => setState(true)}/>
                <Form.Check className="mx-3" inline label="Article" type="radio" name="posttype" id="article" 
                    onClick={() => setState(false)}/>
            </Form>
        </div>
    );
}

export default PostSelector;