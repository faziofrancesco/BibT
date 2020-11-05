import React from "react";
import "citation-js";
import Pagination from "@material-ui/lab/Pagination";
import jsPDF from 'jspdf'
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/DropdownItem";


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
            showModal: false
        };
        this.t = 0;
        this.temp = []
        this.pageSizes = [3, 6, 9];
    }

    componentDidMount() {
        this.retrieveTutorials();
    }

    refreshList() {
        this.retrieveTutorials();
        this.setState({
            currentTutorial: null,
            currentIndex: -1,
        });
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
                            <DropdownButton drop={"right"} id="dropdown-basic-button" title="Delete" split
                                            variant="danger">
                                <DropdownItem onClick={this.deleteCitation}>Delete
                                    Citation</DropdownItem>
                                <DropdownItem onClick={this.deleteAllCitation}>Delete All
                                    Citation</DropdownItem>
                            </DropdownButton>

                            <button type="button" class="btn btn-primary" data-toggle="modal"
                                    data-target="#exampleModalCenter">
                                Export txt
                            </button>


                            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
                                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLongTitle">Export</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <form>
                                                <textarea rows="5" cols="60" id="areaEx" name="description"></textarea>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close
                                            </button>
                                            <button type="button" onClick={this.downloadTxtFile} data-dismiss="modal"
                                                    class="btn btn-primary">Export
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
        returnValue.push(<div>
            {template}
        </div>)

        console.log(returnValue)
        return returnValue;
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

    generatePDF = () => {
        var doc = new jsPDF('p', 'pt');
        doc.setFontSize(5);
        doc.setFont("helvetica");
        doc.setTextColor(0, 0, 255);
        let citation = this.t
        let v = 20;
        for (const x in citation) {
            if (citation[x] != null && x != "id") {
                doc.text(0, v, x + ":" + citation[x])
                v += 20;
            }
        }


        doc.save('demo.pdf')
    }
    generateAllPDF = () => {
        var doc = new jsPDF('p', 'pt');
        let citazioni = this.temp;
        let v = 20;
        var c = 0;
        doc.setFontSize(5);
        doc.setFont("helvetica");
        doc.setTextColor(0, 0, 255);
        for (const x of citazioni) {
            let citation = x;
            c += 1;
            if (c > 4) {
                doc.addPage();
                c = 0;
                v = 20;
            }
            for (const y in citation) {
                if (citation[y] != null) {
                    doc.text(100, v, y + ":" + citation[y])
                    v += 20;
                }
            }
            v += 20;
            doc.text(50, v, "              ")
            doc.text(50, v + 20, "              ")
        }
        doc.setFont('helvetica')
        doc.save('demo.pdf')
    }
    downloadTxtFile = () => {
        const element = document.createElement("a");
        let citation = this.t;

        let txt = document.getElementById("areaEx").value;
        txt = txt.replace('$author', citation['author']);
        txt = txt.replace('$title', citation['title']);
        txt = txt.replace('$journal', citation['journal']);
        txt = txt.replace('$year', citation['year']);
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
        const element = document.createElement("a");
        let citazioni = this.temp;
        let txt = "";
        for (const x of citazioni) {
            let citation = x;
            for (const y in citation) {
                if (citation[y] != null && y != "id") {
                    txt += y + ":" + citation[y] + "\n";
                }
            }
            txt += "\n";
            txt += "\n";
        }
        const file = new Blob([txt],
            {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element);
        element.click();
    }
}