import React from "react";

export default class Add extends React.Component {
    constructor(props) {
        super(props);
        

    }

    openFile = function (event) {
        var input = event.target;

        var reader = new FileReader();
        reader.onload = function () {
            var text = reader.result;
            //console.log(reader.result.substring(0, 200));
            var bibtexParse = require('bibtex-parse-js');

            var sample = bibtexParse.toJSON(text);
            sample[0].entryTags["@type"] = sample[0].entryType


            fetch('/prova', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sample[0].entryTags),
            })
                .then(response => response.json())
                .then(dati => {
                    console.log('Success:', dati);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });


        };
        reader.readAsText(input.files[0]);
    };

    render() {
        return (
            <span>
            <div>
                <input type="file" id="file" accept='text' onChange={this.openFile}></input>
                </div>
            </span>
        )
            ;
    }

}