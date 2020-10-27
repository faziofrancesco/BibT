import React from "react";
import {Graph} from "react-d3-graph";
import "./CitationTree.css"


export default function Grafo({data}) {
    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
            color: "orange",
            size: 200,
            highlightStrokeColor: "blue"
        },
        link: {
            highlightColor: "lightblue"
        },
        width: "500",
        height: "500"

    };

    const onDoubleClickNode = function (nodeId) {

        let selectNode = data.nodes.filter((item) => {
            return item.id === nodeId;
        });
        selectNode.forEach((item) => {

            window.alert("title:" + item.title + "" +
                "author:" + item.author + "" +
                "" + "intro" + item.intro)
        });

    };

    return (
        <div>

            {data.nodes.length != 0 &&
            <Graph
                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                data={data}
                config={myConfig}
                onDoubleClickNode={onDoubleClickNode}
            />}
        </div>

    );
}