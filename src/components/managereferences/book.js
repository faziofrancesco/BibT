import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Book extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Group controlId="formAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" placeholder="Enter Author"/>
                    </Form.Group>

                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title"/>
                    </Form.Group>
                    <Form.Group controlId="formPublisher">
                        <Form.Label>Publisher</Form.Label>
                        <Form.Control type="text" placeholder="Enter Publisher"/>
                    </Form.Group>

                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter Address"/>
                    </Form.Group>

                    <Form.Group controlId="formYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="text" placeholder="Enter Year"/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }

}