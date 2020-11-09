import React from "react";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Book extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                author: "",
                title: "",
                publisher: "",
                address: "",
                year: "",
            },
            isSubmitting: false,
            isError: false

        };


    }

    submitForm = async e => {
        e.preventDefault();
        this.setState({isSubmitting: true});
        let v = this.state.values;
        v["@type"] = "book";
        console.log(v);
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
            : this.setState({message: data.error, isError: true});
        toast("add book in your collection !");

        setTimeout(
            () =>
                this.setState({
                    isError: false,
                    message: "",
                    values: {author: "", title: "", publisher: "", address: "", year: ""}
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
                            name="publisher"
                            id="publisher"
                            value={this.state.values.publisher}
                            onChange={this.handleInputChange}
                            title="publisher"
                            class="form-control"
                            placeholder="Publisher"
                        />
                    </div>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={this.state.values.address}
                            onChange={this.handleInputChange}
                            title="address"
                            class="form-control"
                            placeholder="Address"
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
                    <button class="btn btn-primary" type="submit">Submit</button>
                    <ToastContainer/>

                </form>
                <div className={`message ${this.state.isError && "error"}`}>
                    {this.state.isSubmitting ? "Submitting..." : this.state.message}
                </div>
            </div>
        );
    }
}
