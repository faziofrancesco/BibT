import React, {useState} from "react";
import Nav from "react-bootstrap/Nav"
import "citation-js";
import {Link, Route, Switch, useRouteMatch} from "react-router-dom";
import Add from "./Add";
import Book from "./book";
import Article from "./article";
import Inproceedings from "./inproceedings";
import Misc from "./misc";

export default function Manage(props) {
    const [stato, setstato] = useState(false);
    let {path, url} = useRouteMatch();

    return (
        <div className={"row"}>
            <div style={{
                width: 100,
                height: 900,
                borderLeft: 10,
                backgroundColor: "cornflowerblue",
                borderStyle: "solid"
            }}>
                {!stato && <Nav className="<col>">

                    <Link to={`${url}/list`}>List</Link>
                    <button onClick={() => setstato(true)}>Add</button>
                    <Link to={`${url}/Export`}>Export</Link>
                </Nav>}
                {stato && <Nav className="<col>">
                    <Link to={`${url}/article`}>Article</Link>
                    <Link to={`${url}/book`}>Book</Link>
                    <Link to={`${url}/inproceedings`}>Inproceedings</Link>
                    <Link to={`${url}/misc`}>Misc</Link>
                    <Link to={`${url}/add`}>AddFile</Link>
                    <button placeholder={"return menu"} onClick={() => setstato(false)}>Return Menu</button>
                </Nav>}
                }
            </div>
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
                </Switch>
            </div>

        </div>
    )
}
