import React from "react";
import "citation-js";
import Pagination from "@material-ui/lab/Pagination";


export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

        this.state = {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: "",

            page: 1,
            count: 0,
            pageSize: 3,
        };

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

    setActiveTutorial(tutorial, index) {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index,
        });
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
        fetch("/view", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(param)
        })
            .then(response => response.json())
            .then(({tutorials, totalPages}) => {
                this.setState({tutorials: tutorials, count: totalPages});
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
            v.push(
                <div>
                    <label>
                        <strong>{x}:</strong>
                    </label>{" "}
                    {citation[x]}
                </div>
            )
        }
        return v;
    }


}

