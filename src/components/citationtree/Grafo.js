import React from "react";
import {Graph} from "react-d3-graph";
import "./CitationTree.css"


export default function Grafo({data}) {
    var modal = false;
    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
            color: "orange",
            size: 700,
            highlightStrokeColor: "blue"
        },
        link: {
            highlightColor: "lightblue"
        }
    };
    const modalOpen = function () {

        modal = true;
    }

    const modalClose = function () {

        modal = false;
    }
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

            {data &&
            <Graph
                id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
                data={data}
                config={myConfig}
                onDoubleClickNode={onDoubleClickNode}
            />}
            {!data && <span>Errore Generico</span>}
        </div>

    );
}