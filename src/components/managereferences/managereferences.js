import React, {useState} from "react";
import "citation-js";
import {Route, Switch, useHistory, useRouteMatch} from "react-router-dom";
import Add from "./Add";
import Book from "./book";
import Article from "./article";
import Inproceedings from "./inproceedings";
import Misc from "./misc";
import List from "./List";

import "./navbar.css"

export default function Manage(props) {
    const [stato, setstato] = useState(false);
    let {path, url} = useRouteMatch();

    let history = useHistory()

    return (

        <div className={"row"}>

            {!stato && <div className="vertical-menu">
                <a href="#" className="active">Manage References</a>
                <a href={`${url}/list`}>List</a>
                <a onClick={() => setstato(true)}>Add</a>
            </div>}
            {stato && <div className="vertical-menu">
                <a href="#" className="active">Add Citation</a>
                <a href={`${url}/article`}>Article</a>
                <a href={`${url}/book`}>Book</a>
                <a href={`${url}/inproceedings`}>Inproceedings</a>
                <a href={`${url}/misc`}>Misc</a>
                <a href={`${url}/add`}>AddFile</a>
                <a onClick={() => {
                    setstato(false);
                    history.push("/manage");
                }}>Return
                    Menu</a>
            </div>}

            &emsp;
            &emsp;
            <div className={"col"}>
                <Switch>
                    <Route exact path={`${path}/add`}>
                        <Add/>
                    </Route>
                    <Route exact path={`${path}/book`}>
                        <Book/>
                    </Route>
                    <Route exact path={`${path}/Inproceedings`}>
                        <Inproceedings/>
                    </Route>
                    <Route exact path={`${path}/Misc`}>
                        <Misc/>
                    </Route>
                    <Route exact path={`${path}/Article`}>
                        <Article/>
                    </Route>
                    <Route exact path={`${path}/list`}>
                        <List/>
                    </Route>

                </Switch>
            </div>

        </div>
    )
}

