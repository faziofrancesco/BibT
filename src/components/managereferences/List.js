import React from "react";
import "citation-js";
import Pagination from "@material-ui/lab/Pagination";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.deleteCitation = this.deleteCitation.bind(this);
        this.deleteAllCitation = this.deleteAllCitation.bind(this)
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: "",

            page: 1,
            count: 0,
            currentTitle: "",
            currentId: 1,
            pageSize: 3,
            showModal: false,
            author: "",
            title: "",
            howpublished: "",
            year: "",
            note: "",
            booktitle: "",
            series: "",
            pages: "",
            publisher: "",
            address: "",
            journal: "",
            volume: "",
            number: "",
            id: ""


        };


        this.t = 0;
        this.temp = []
        this.pageSizes = [3, 6, 9];
    }

    componentDidMount() {
        this.retrieveTutorials();
    }

    submitForm = async e => {
        e.preventDefault();
        let citation = this.t;
        let values = {}
        for (const i in citation) {
            if (i != "name") {
                if (this.state[i] == "") {
                    values[i] = citation[i];
                } else {
                    values[i] = this.state[i];
                }
            } else {
                values["@type"] = citation["name"];
            }
        }
        const res = await fetch("/update", {

            method: "POST",
            body: JSON.stringify(values),

            headers: {
                "Content-Type": "application/json"
            },
        }).then(data => {
            toast("Update your citation");
            this.refreshList()
        })
            .catch((error) => {
                toast("Error in your Citation or Generic Error");
                this.refreshList()
            });

    }

    refreshList() {
        this.retrieveTutorials();
        this.setState({
            currentTutorial: null,
            currentIndex: -1,
        });
    }

    handleChange(input, value) {
        this.setState({
            [input]: value
        })
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle,
        });
    }

    deleteAllCitation() {
        fetch("/deleteAllCitation")
            .then(response => response.json())
            .catch((e) => {
                console.log(e);
            });
        window.location.reload(false)
    }


    deleteCitation() {
        console.log(this.t)
        let citation = this.t;
        let id;
        let name;
        for (const x in citation) {
            if (x == 'name') {
                name = citation[x]
                console.log(name)
            }
            if (x == 'id') {
                id = citation[x]
                console.log(id)
            }
        }
        let param1 = {
            id: id,
            name: name,

        }
        fetch("/deleteCitation?" + new URLSearchParams(param1))
            .then(response => response.json())
            .catch((e) => {
                console.log(e);
            });
        window.location.reload(false)
    }

    setActiveTutorial(tutorial, index) {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index,

        });
        this.t = tutorial;
    }

    getRequestParams(searchTitle, page, pageSize) {
        let params = {};

        if (searchTitle) {
            params["title"] = searchTitle;
        }

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    }

    retrieveTutorials() {

        const {searchTitle, page, pageSize} = this.state;
        const params = this.getRequestParams(searchTitle, page, pageSize);
        let param = {
            title: searchTitle,
            page: page,
            pageSize: pageSize
        };

        let query = Object.keys(param)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(param[k]))
            .join('&');

        //  let url = `/view/${param.searchTitle}/${param.page}/${param.pageSize}`;
        fetch("/view?" + new URLSearchParams(param))
            .then(response => response.json())
            .then(({tutorials, totalPages}) => {
                this.setState({tutorials: tutorials, count: totalPages});
            }).then(data => console.log(data))
            .catch((e) => {
                console.log(e);
            });
        fetch("/AllCitation")
            .then(response => response.json())
            .then(({citation}) => {
                this.temp = citation;
            }).then(data => console.log(data))
            .catch((e) => {
                console.log(e);
            });
    }


    handlePageChange(event, value) {
        this.setState(
            {
                page: value,
            },
            () => {
                this.retrieveTutorials();
            }
        );
    }


    handlePageSizeChange(event) {
        this.setState(
            {
                pageSize: event.target.value,
                page: 1
            },
            () => {
                this.retrieveTutorials();
            }
        );
    }

    render() {
        const {
            searchTitle,
            tutorials,
            currentTutorial,
            currentIndex,
            page,
            count,
            pageSize,
        } = this.state;

        return (

            <div className="list row">

                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
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
                <div className="col-md-6">
                    <h4>Citations List</h4>

                    <div className="mt-3">
                        {"Items per Page: "}
                        <select onChange={this.handlePageSizeChange} value={pageSize}>
                            {this.pageSizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                        &emsp;
                        &emsp;
                        &emsp;
                        &emsp;
                        <button type="button" style={{backgroundColor: "green"}} className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#exampleModalCenter1">
                            Export All
                        </button>
                        &emsp;
                        &emsp;
                        <button type="button" style={{backgroundColor: "red"}} className="btn btn-primary"
                                onClick={this.deleteAllCitation}>Delete All
                        </button>
                        <Pagination
                            className="my-3"
                            count={count}
                            page={page}
                            siblingCount={1}
                            boundaryCount={1}
                            variant="outlined"
                            shape="rounded"
                            onChange={this.handlePageChange}
                        />


                        <div className="modal fade" id="exampleModalCenter1" tabIndex="-1" role="dialog"
                             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Export</h5>
                                        <button type="button" className="close" data-dismiss="modal"
                                                aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <textarea rows="5" cols="60" id="areaEx1" name="description"></textarea>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-dismiss="modal">Close
                                        </button>
                                        <button type="button" onClick={this.generateAllTxt} data-dismiss="modal"
                                                className="btn btn-primary">Export
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ul className="list-group">
                        {tutorials &&
                        tutorials.map((tutorial, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveTutorial(tutorial, index)}
                                key={index}
                            >
                                {tutorial.title}
                            </li>
                        ))}
                    </ul>


                </div>
                <div className="col-md-6">
                    {currentTutorial ? (
                        <div>
                            <h4>Citation</h4>
                            {this.Stampa(currentTutorial)}

                            <button type="button" style={{backgroundColor: "red"}} className="btn btn-primary"
                                    onClick={this.deleteCitation}>Delete
                            </button>
                            &emsp;
                            &emsp;
                            <button type="button" style={{backgroundColor: "green"}} class="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter">
                                Export
                            </button>
                            &emsp;
                            &emsp;
                            <button type="button" style={{backgroundColor: "blue"}} className="btn btn-primary"
                                    data-toggle="modal"
                                    data-target="#exampleModalCenter2">
                                Update
                            </button>

                            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
                                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLongTitle">Export</h5>
                                            <button type="button" class="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <form>
                                                    <textarea rows="5" cols="60" id="areaEx"
                                                              name="description"></textarea>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                    data-dismiss="modal">Close
                                            </button>
                                            <button type="button" onClick={this.downloadTxtFile}
                                                    data-dismiss="modal"
                                                    class="btn btn-primary">Export
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal fade" id="exampleModalCenter2" tabIndex="-1" role="dialog"
                                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLongTitle">Update</h5>
                                            <button type="button" className="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">

                                            {this.Update(currentTutorial)}

                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary"
                                                    data-dismiss="modal">Close
                                            </button>
                                            <button type="button" data-dismiss="modal"
                                                    onClick={this.submitForm}
                                                    className="btn btn-primary">Update

                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ToastContainer/>
                        </div>

                    ) : (
                        <div>
                            <br/>
                            <p>Please click on a Citation</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }


    Stampa = function (Citation) {
        let returnValue = []


        let template = this.generatemplate(Citation);
        returnValue.push(<form>
            {template}
        </form>)

        console.log(returnValue)
        return returnValue;
    }
    Update = function (Citation) {
        let returnValue = []
        let template = this.generateupdatetemplate(Citation);
        returnValue.push(<form>{template}</form>)
        return returnValue;
    }

    generateupdatetemplate(citation) {
        let v = [];

        for (const x in citation) {
            if (x != "id" && x != "year") {
                v.push(
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            name={x}
                            id={x}
                            defaultValue={citation[x]}
                            title={x}
                            class="form-control"
                            onChange={e => this.handleChange(x, e.target.value)}
                            placeholder={x}
                        />
                    </div>
                )
            } else if (x != "id" && x == "year") {
                v.push(
                    <div className="input-group mb-3">
                        <input
                            type="number"
                            name={x}
                            id={x}
                            title={x}
                            defaultValue={citation[x]}
                            onChange={e => this.handleChange(x, e.target.value)}
                            class="form-control"
                            placeholder={x}

                        />
                    </div>
                )
            }

        }
        return v;
    }

    generatemplate(citation) {
        let v = [];
        for (const x in citation) {
            if (citation[x] != null && x != "id") {
                v.push(
                    <div>
                        <label>
                            <strong>{x}:</strong>
                        </label>{" "}
                        {citation[x]}
                    </div>
                )
            }
        }
        return v;
    }

    downloadTxtFile = () => {
        const element = document.createElement("a");
        let citation = this.t;

        let txt = document.getElementById("areaEx").value;
        txt = txt.replace('$author', citation['author']);
        txt = txt.replace('$title', citation['title']);
        txt = txt.replace('$journal', citation['journal']);
        txt = txt.replace('$year', citation['year']);
        txt = txt.replace('$volume', citation['volume']);
        txt = txt.replace('$name', citation['name']);
        txt = txt.replace('$pages', citation['pages']);
        txt = txt.replace('$booktitle', citation['booktitle']);
        txt = txt.replace('$address', citation['address']);
        txt = txt.replace('$publisher', citation['publisher']);
        txt = txt.replace('$series', citation['series']);
        txt = txt.replace('$howpublished', citation['howpublished']);
        txt = txt.replace('$note', citation['note']);
        txt = txt.replace('undefined', '');
        console.log(txt);
        const file = new Blob([txt],
            {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element);
        element.click();
        document.getElementById("areaEx").value = "";
    }

    generateAllTxt = () => {
        let citazioni = this.temp;
        const element = document.createElement("a");
        let txt = document.getElementById("areaEx1").value;
        let output = "";
        for (const x of citazioni) {
            let citation = x;
            txt = txt.replace('$author', citation['author']);
            txt = txt.replace('$title', citation['title']);
            txt = txt.replace('$journal', citation['journal']);
            txt = txt.replace('$year', citation['year']);
            txt = txt.replace('$volume', citation['volume']);
            txt = txt.replace('$name', citation['name']);
            txt = txt.replace('$pages', citation['pages']);
            txt = txt.replace('$booktitle', citation['booktitle']);
            txt = txt.replace('$address', citation['address']);
            txt = txt.replace('$publisher', citation['publisher']);
            txt = txt.replace('$series', citation['series']);
            txt = txt.replace('$howpublished', citation['howpublished']);
            txt = txt.replace('$note', citation['note']);
            txt = txt.replace('undefined', '');
            txt += "\n";
            txt += "\n";
            output += txt;
            txt = document.getElementById("areaEx1").value;
        }
        console.log(output);
        const file = new Blob([output],
            {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element);
        element.click();
        document.getElementById("areaEx1").value = "";
    }

}