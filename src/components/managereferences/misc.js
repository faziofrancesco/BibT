import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Misc extends React.Component {
    constructor(props) {
        super(props);

        // var bibtexParse = require('bibtex-parse-js');

        // var sample = bibtexParse.toJSON();

        // console.log(sample);
    }

    render() {
        return (
            <div>
                <Form>


                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title"/>
                    </Form.Group>

                    <Form.Group controlId="formAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" placeholder="Enter Author"/>
                    </Form.Group>

                    <Form.Group controlId="formhowpublished">
                        <Form.Label>howpublished</Form.Label>
                        <Form.Control type="text" placeholder="Enter published"/>
                    </Form.Group>

                    <Form.Group controlId="formyear">
                        <Form.Label>year</Form.Label>
                        <Form.Control type="text" placeholder="Enter year"/>
                    </Form.Group>

                    <Form.Group controlId="formNote">
                        <Form.Label>note</Form.Label>
                        <Form.Control type="text" placeholder="Enter note"/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }

}