import React from "react";
import {Graph} from "react-d3-graph";


export default function Grafo({data}) {

    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
            color: "lightgreen",
            size: 500,
            highlightStrokeColor: "blue"
        },
        link: {
            highlightColor: "lightblue"
        }
    };
    const onDoubleClickNode = function (nodeId) {

        let selectNode = data.nodes.filter((item) => {
            return item.id === nodeId;
        });
        selectNode.forEach((item) => {
            alert("  titolo:" + item.title + "  autore:" + item.author + "  intro:" + item.intro)
        });

    };

    return (
        <div>

            {data &&
            <Graph
                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                data={data}
                config={myConfig}
                onDoubleClickNode={onDoubleClickNode}
            />}
            {!data && <span>ciao</span>}
        </div>

    );
}