import React from "react";
import "citation-js";

export default class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cit: [],
        };
    }

    componentDidMount() {
        fetch('/view')
            .then(response => response.json())
            .then(data => this.setState({cit: data})).then(data => {
            console.log('Success:', this.state.cit);
        });
    }

    Stampa = function () {
        let returnValue = []


        for (const citation of this.state.cit) {
            let template = this.generatemplate(citation);
            returnValue.push(<div>
                {template}
            </div>)
        }
        console.log(returnValue)
        return returnValue;
    }

    generatemplate(citation) {
        let v = [];
        for (const x in citation) {
            v.push(<tr>
                <td>{x}</td>
                <td>{citation[x]}</td>
            </tr>)
        }
        return v;
    }

    render() {
        return (
            <span>
            <div>
                {this.Stampa()}
                </div>
            </span>
        )
            ;
    }
}

