import React from "react";
import {Graph} from "react-d3-graph";


export default function Grafo({data, attr}) {
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
            let attr1 = [item.id, item.title, item.author, item.intro, item.site];
            //  window.alert("title:" + item.title + "" +
            //    "author:" + item.author + "" +
            //  "" + "intro" + item.intro)
            attr(attr1);
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