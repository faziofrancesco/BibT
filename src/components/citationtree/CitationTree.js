import React from "react";
import "citation-js";
import Grafo from "./Grafo";

export default class CitationTree extends React.Component {
    constructor(props) {
        super(props);

        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.onChangeSearchAuthor = this.onChangeSearchAuthor.bind(this);
        this.onChangeProfondita = this.onChangeProfondita.bind(this);
        this.state = {
            tutorials: {
                links: [
                    {source: "1", target: "2"},
                    {source: "2", target: "3"},
                ],
                nodes: [{
                    title: "ciao1", id: "1",
                    author: "ciao1",
                    intro: "ciao1"
                }, {
                    title: "ciao1"
                    ,
                    id: "2",
                    author: "ciao1",
                    intro: "ciao1"
                }, {title: "ciao3", id: "3", author: "ciao3", intro: "ciao3"}],

            },
            searchAuthor: "",
            profondita: 3
        };
        this.profonditas = [3, 6, 9];
    }

    componentDidMount() {
        this.retrieveTutorials();
    }


    onChangeSearchAuthor(e) {
        const searchAuthor = e.target.value;

        this.setState({
            searchAuthor: searchAuthor,
        });
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
            .then(response => response.json()).then(({message}) => {
            this.setState({tutorials: message});
        }).then(data => console.log(data))
            .catch((e) => {
                console.log(e);
            });
    }


    onChangeProfondita(event, value) {
        this.setState(
            {
                profondita: value,
            },
            () => {
                this.retrieveTutorials();
            }
        );
    }


    render() {
        const {
            searchAuthor,
            profondita,
            tutorials
        } = this.state;

        return (
            <span>
                <div className="list row">
                    <div className="col-md-8">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Author"
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
                      <div id="Graph"
                           style={{width: '500em', height: '200em'}}><Grafo
                          data={tutorials}
                      /></div>
            </span>
        );
    }


}

