import React from "react";

export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                Author: "",
                Title: "",
                Journal: "",
                Year: "",
                Volume: "",
                Number: "",
                Pages: ""
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
            : this.setState({message: data.error, isError: true});

        setTimeout(
            () =>
                this.setState({
                    isError: false,
                    message: "",
                    values: {Author: "", Title: "", Journal: "", Year: "", Volume: "", Number: "", Pages: ""}
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
                        <label htmlFor="Author">Author</label>
                        <input
                            type="text"
                            name="Author"
                            id="Author"
                            value={this.state.values.Author}
                            onChange={this.handleInputChange}
                            title="Author"

                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="Title">Title</label>
                        <input
                            type="text"
                            name="Title"
                            id="Title"
                            value={this.state.values.Title}
                            onChange={this.handleInputChange}
                            title="Title"

                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="Journal">Journal</label>
                        <input
                            type="text"
                            name="Journal"
                            id="Journal"
                            value={this.state.values.Journal}
                            onChange={this.handleInputChange}
                            title="Journal"

                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="Year">Year</label>
                        <input
                            type="number"
                            name="Year"
                            id="Year"
                            value={this.state.values.Year}
                            onChange={this.handleInputChange}
                            title="Year"

                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="Volume">Volume</label>
                        <input
                            type="text"
                            name="Volume"
                            id="Volume"
                            value={this.state.values.Volume}
                            onChange={this.handleInputChange}
                            title="Volume"

                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="Number">Number</label>
                        <input
                            type="text"
                            name="Number"
                            id="Number"
                            value={this.state.values.Number}
                            onChange={this.handleInputChange}
                            title="Number"

                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="Pages">Pages</label>
                        <input
                            type="text"
                            name="Pages"
                            id="Pages"
                            value={this.state.values.Pages}
                            onChange={this.handleInputChange}
                            title="Pages"

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
