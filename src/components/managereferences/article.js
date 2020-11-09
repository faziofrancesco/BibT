import React from "react";


import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            values: {
                author: "",
                title: "",
                journal: "",
                year: "",
                volume: "",
                number: "",
                pages: ""
            },
            isSubmitting: false,
            isError: false

        };


    }

    submitForm = async e => {
        e.preventDefault();
        console.log(this.state);
        this.setState({isSubmitting: true});
        let v = this.state.values;
        v["@type"] = "article";
        const res = await fetch("/prova", {

            method: "POST",
            body: JSON.stringify(v),
            headers: {
                "Content-Type": "application/json"
            }

        });
        this.setState({isSubmitting: false});
        const data = await res.json();
        !data.hasOwnProperty("error")
            ? this.setState({message: data.success})
            : this.setState({message: data.error, isError: true,});


        toast("add Article in your collection !");
        

        setTimeout(
            () =>
                this.setState({
                    isError: false,
                    message: "",
                    values: {author: "", title: "", journal: "", year: "", volume: "", number: "", pages: ""}
                }),
            1600
        );
    };

    handleInputChange = e =>
        this.setState({
            values: {...this.state.values, [e.target.name]: e.target.value}
        });

    render() {
        return (
            <div>
                <form onSubmit={this.submitForm}>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            name="author"
                            id="author"
                            value={this.state.values.author}
                            onChange={this.handleInputChange}
                            title="author"
                            class="form-control"
                            placeholder="Author"
                        />
                    </div>
                    <div className="input-group mb-3">

                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={this.state.values.title}
                            onChange={this.handleInputChange}
                            title="title"
                            class="form-control"
                            placeholder="Title"

                        />
                    </div>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            name="journal"
                            id="journal"
                            value={this.state.values.journal}
                            onChange={this.handleInputChange}
                            title="journal"
                            class="form-control"
                            placeholder="Journal"

                        />
                    </div>
                    <div className="input-group mb-3">

                        <input
                            type="number"
                            name="year"
                            id="year"
                            value={this.state.values.year}
                            onChange={this.handleInputChange}
                            title="year"
                            class="form-control"
                            placeholder="Year"

                        />
                    </div>
                    <div className="input-group mb-3">

                        <input
                            type="text"
                            name="volume"
                            id="volume"
                            value={this.state.values.volume}
                            onChange={this.handleInputChange}
                            title="volume"
                            class="form-control"
                            placeholder="Volume"

                        />
                    </div>
                    <div className="input-group mb-3">

                        <input
                            type="text"
                            name="number"
                            id="number"
                            value={this.state.values.number}
                            onChange={this.handleInputChange}
                            title="number"
                            class="form-control"
                            placeholder="Number"

                        />
                    </div>
                    <div className="input-group mb-3">


                        <input
                            type="text"
                            name="pages"
                            id="pages"
                            value={this.state.values.pages}
                            onChange={this.handleInputChange}
                            title="pages"
                            class="form-control"
                            placeholder="Pages"

                        />
                    </div>
                    <button class="btn btn-primary" type="submit">Submit</button>
                    <ToastContainer/>

                </form>

                <div className={`message ${this.state.isError && " error"}`}>
                    {this.state.isSubmitting ? " Submitting..." : this.state.message}
                </div>
            </div>
        );
    }
}
