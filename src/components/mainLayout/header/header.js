import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <header>

                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Bib2020</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/manage">manage references</Nav.Link>
                        <Nav.Link href="/CitationTree">citation tree</Nav.Link>
                        <Nav.Link href="#credits">credits</Nav.Link>
                    </Nav>
                  
                </Navbar>
                &emsp;
                &emsp;
            </header>

        );
    }
}