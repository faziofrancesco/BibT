import React from "react";
import Card from  "react-bootstrap/Card"

export default class Home extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(

            <Card className="bg-dark text-white">
                <Card.Img src="home.jpg" alt="Card image" />
            </Card>
        );
    }
}