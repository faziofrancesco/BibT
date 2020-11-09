import React from "react";
import {Graph} from "react-d3-graph";


export default function Grafo({data, attr}) {
    const myConfig = {
        "automaticRearrangeAfterDropNode": false,
        "collapsible": false,
        "directed": false,
        "focusAnimationDuration": 0.75,
        "focusZoom": 1,
        "highlightDegree": 1,
        "highlightOpacity": 0.2,
        "linkHighlightBehavior": true,
        "maxZoom": 8,
        "minZoom": 0.1,
        "nodeHighlightBehavior": true,
        "panAndZoom": false,
        "staticGraph": false,
        "staticGraphWithDragAndDrop": false,
        width: "600",
        height: "500",
        "d3": {
            "alphaTarget": 0.05,
            "gravity": -400,
            "linkLength": 50,
            "linkStrength": 1,
            "disableLinkForce": false
        },
        "node": {
            "color": "#FFFF00",
            "fontColor": "black",
            "fontSize": 1,
            "fontWeight": "normal",
            "highlightColor": "red",
            "highlightFontSize": 12,
            "highlightFontWeight": "bold",
            "highlightStrokeColor": "SAME",
            "highlightStrokeWidth": 1.5,
            "labelProperty": "name",
            "mouseCursor": "pointer",
            "opacity": 1,
            "renderLabel": true,
            "strokeColor": "none",
            "strokeWidth": 1.5,
            "svg": "",
            "symbolType": "circle",
            size: "200"
        },
        "link": {
            "color": "FFA500",
            "fontColor": "red",
            "fontSize": 10,
            "fontWeight": "normal",
            "highlightColor": "blue",
            "highlightFontSize": 8,
            "highlightFontWeight": "bold",
            "mouseCursor": "pointer",
            "opacity": 1,
            "renderLabel": false,
            "semanticStrokeWidth": false,
            "strokeWidth": 4,
            "markerHeight": 6,
            "markerWidth": 6
        }
    };

    const onClickNode = function (nodeId) {

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
                onClickNode={onClickNode}
            />}
        </div>

    );
}