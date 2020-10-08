import React from "react";

export default class Misc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                author: "",
                title: "",
                howpublished: "",
                year: "",
                note: "",

            },
            isSubmitting: false,
            isError: false

        };


    }

    submitForm = async e => {
        e.preventDefault();
        this.setState({isSubmitting: true});
        let v = this.state.values;
        v["@type"] = "misc";
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

        setTimeout(
            () =>
                this.setState({
                    isError: false,
                    message: "",
                    values: {author: "", title: "", howpublished: "", year: "", note: ""}
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
                    <div className="input-group">
                        <label htmlFor="author">author</label>
                        <input
                            type="text"
                            name="author"
                            id="author"
                            value={this.state.values.author}
                            onChange={this.handleInputChange}
                            title="author"

                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="title">title</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={this.state.values.title}
                            onChange={this.handleInputChange}
                            title="title"

                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="howpublished">howpublished</label>
                        <input
                            type="text"
                            name="howpublished"
                            id="howpublished"
                            value={this.state.values.howpublished}
                            onChange={this.handleInputChange}
                            title="howpublished"

                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="year">year</label>
                        <input
                            type="number"
                            name="year"
                            id="year"
                            value={this.state.values.year}
                            onChange={this.handleInputChange}
                            title="year"

                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="note">note</label>
                        <input
                            type="text"
                            name="note"
                            id="note"
                            value={this.state.values.note}
                            onChange={this.handleInputChange}
                            title="note"

                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <div className={`message ${this.state.isError && "error"}`}>
                    {this.state.isSubmitting ? "Submitting..." : this.state.message}
                </div>
            </div>
        );
    }
}
