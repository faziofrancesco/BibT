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
                links: [],
                nodes: [],

            },
            searchAuthor: "",
            profondita: 3
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
                <div id="Graph"
                     style={{border: "3px solid blue"}}>
                    <Grafo data={tutorials}/>
                </div>}
                {tutorials.nodes.length == 0 && <span>Non esiste il grafo delle citazioni per la parola cercata</span>}
            </span>
        );
    }


}

