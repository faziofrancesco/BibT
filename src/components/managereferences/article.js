import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class Article extends React.Component {
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
                    <Form.Group controlId="formAuthor">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" placeholder="Enter Author"/>
                    </Form.Group>

                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title"/>
                    </Form.Group>
                    <Form.Group controlId="formJournal">
                        <Form.Label>Journal</Form.Label>
                        <Form.Control type="text" placeholder="Enter Journal"/>
                    </Form.Group>

                    <Form.Group controlId="formYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="text" placeholder="Enter Year"/>
                    </Form.Group>

                    <Form.Group controlId="formVolume">
                        <Form.Label>Volume</Form.Label>
                        <Form.Control type="text" placeholder="Enter Volume"/>
                    </Form.Group>

                    <Form.Group controlId="formNumber">
                        <Form.Label>Number</Form.Label>
                        <Form.Control type="text" placeholder="Enter Number"/>
                    </Form.Group>

                    <Form.Group controlId="formPages">
                        <Form.Label>Pages</Form.Label>
                        <Form.Control type="text" placeholder="Enter Pages"/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        );
    }

}