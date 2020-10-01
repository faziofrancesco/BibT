import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Inproceedings extends React.Component {
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
                    <Form.Group controlId="formBookTitle">
                        <Form.Label>bookTitle</Form.Label>
                        <Form.Control type="text" placeholder="Enter bookTitle"/>
                    </Form.Group>

                    <Form.Group controlId="formseries">
                        <Form.Label>series</Form.Label>
                        <Form.Control type="text" placeholder="Enter series"/>
                    </Form.Group>

                    <Form.Group controlId="formyear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="text" placeholder="Enter Year"/>
                    </Form.Group>

                    <Form.Group controlId="formpages">
                        <Form.Label>pages</Form.Label>
                        <Form.Control type="text" placeholder="Enter pages"/>
                    </Form.Group>

                    <Form.Group controlId="formpublisher">
                        <Form.Label>publisher</Form.Label>
                        <Form.Control type="text" placeholder="Enter publisher"/>
                    </Form.Group>

                    <Form.Group controlId="formaddress">
                        <Form.Label>address</Form.Label>
                        <Form.Control type="text" placeholder="Enter address"/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }

}