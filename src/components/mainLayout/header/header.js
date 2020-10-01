import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl"

 import Button from "react-bootstrap/Button";
export default class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(

           <header>

                   <Navbar bg="dark" variant="dark">
                       <Navbar.Brand href="#home">Bib2020</Navbar.Brand>
                       <Nav className="mr-auto">
                           <Nav.Link href="/">Home</Nav.Link>
                           <Nav.Link href="/manage">manage references</Nav.Link>
                           <Nav.Link href="#citation tree">citation tree</Nav.Link>
                           <Nav.Link href="#credits">credits</Nav.Link>
                       </Nav>
                       <Form inline>
                           <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                           <Button variant="outline-info">Search</Button>
                       </Form>
                   </Navbar>
           </header>

        );
    }
}