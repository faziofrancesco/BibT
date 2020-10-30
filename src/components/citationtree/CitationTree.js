import React from "react";
import "citation-js";
import Grafo from "./Grafo";
import {Col, Container, Row} from "react-bootstrap";
import Button from "@material-ui/core/Button";

export default class CitationTree extends React.Component {
    constructor(props) {
        super(props);

        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.onChangeSearchAuthor = this.onChangeSearchAuthor.bind(this);
        this.onChangeProfondita = this.onChangeProfondita.bind(this);
        this.Attributes = this.Attributes.bind(this);
        this.AddFile = this.AddFile.bind(this);
        this.state = {
            tutorials: {
                links: [],
                nodes: [],

            },
            searchAuthor: "",
            profondita: 3,
            nodeP: Array(5).fill(0)
        };
        this.profonditas = [3, 6, 9, 12, 15, 18, 21, 23, 25];
    }


    componentDidMount() {
        if (this.state.tutorials.nodes.length != 0)
            this.retrieveTutorials();
    }


    onChangeSearchAuthor(e) {
        const searchAuthor = e.target.value;

        this.setState({
            searchAuthor: searchAuthor
        });
    }

    Attributes = function (attr) {
        const nodi = attr;
        this.setState({
            nodeP: nodi
        })
    }

    getRequestParams(searchAuthor, profondita) {
        let params = {};

        if (searchAuthor) {
            params["author"] = searchAuthor;
        }

        if (profondita) {
            params["profondita"] = profondita;
        }


        return params;
    }

    retrieveTutorials() {
        console.log(this.state.tutorials)
        const {searchAuthor, profondita} = this.state;
        const params = this.getRequestParams(searchAuthor, profondita);
        let param = {
            author: searchAuthor,
            profondita: profondita,
        };

        let query = Object.keys(param)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(param[k]))
            .join('&');

        //  let url = `/view/${param.searchTitle}/${param.page}/${param.pageSize}`;
        fetch("/graph?" + new URLSearchParams(param))
            .then(response => response.json())
            .then((tutorials) => {
                this.setState({tutorials: tutorials})
            }).then()
            .catch((e) => {
                console.log(e);
            });
    }


    onChangeProfondita(e) {
        const profondita = e.target.value;
        this.setState(
            {
                profondita: profondita,
            },
        );
    }

    AddFile = async function (event) {
        const {nodeP} = this.state;

        let param = {
            title: nodeP[1]
        };
        await fetch("/searchBib?" + new URLSearchParams(param))
            .then(response => response.json())
            .then((bib) => {
                console.log(bib.bib);
                var bibtexParse = require('bibtex-parse-js');
                var sample = bibtexParse.toJSON(bib.bib);
                sample[0].entryTags["@type"] = sample[0].entryType

                fetch('/prova', {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(sample[0].entryTags),
                })
                    .then(response => response.json())
                    .then(dati => {
                        console.log('Success:', dati);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

            })
            .catch((e) => {
                console.log(e);
            });
    };


    render() {
        const {
            searchAuthor,
            profondita,
            tutorials,
            nodeP
        } = this.state;

        return (
            <span>
                <div className="list row">
                    <div className="col-md-8">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                                value={searchAuthor}
                                onChange={this.onChangeSearchAuthor}
                                autoComplete
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={this.retrieveTutorials}
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                    </div>


                </div>
                <div className="mt-3">
                        {"Profondità: "}
                    <select onChange={this.onChangeProfondita} value={profondita}>
                            {this.profonditas.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>

                </div>
                {tutorials.nodes.length != 0 &&
                <Container>
                    <Row>
                        <Col>
                            <Grafo data={tutorials} attr={this.Attributes}/>
                        </Col>
                        <Col>
                            <div>
                                {nodeP[0] != 0 && <p>{nodeP[0]}</p>}
                                {nodeP[1] != 0 && <p>{nodeP[1]}</p>}
                                {nodeP[2] != 0 && <p>{nodeP[2]}</p>}
                                {nodeP[3] != 0 && <p>{nodeP[3]}</p>}
                                {nodeP[0] != 0 && <Button onClick={this.AddFile}>
                                    Add Bibtext
                                </Button>}
                            </div>
                        </Col>
                    </Row>
                </Container>}
                {tutorials.nodes.length == 0 && <span>Non esiste il grafo delle citazioni per la parola cercata</span>}
                    </span>
        );
    }


}
