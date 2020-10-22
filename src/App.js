import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MainTemplate from "./components/mainLayout/template/mainTemplate";
import Home from "./components/home/home";
import Manage from "./components/managereferences/managereferences"
import CitationTree from "./components/citationtree/CitationTree";
import "./App.css"

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <BrowserRouter>
                <MainTemplate>
                    <Switch>
                        <Route exact path='/'>
                            <Home/>
                        </Route>
                        <Route path='/manage'>
                            <Manage/>
                        </Route>
                        <Route path='/CitationTree'>
                            <CitationTree/>
                        </Route>
                    </Switch>
                </MainTemplate>
            </BrowserRouter>
        );
    }
}

export default App;
