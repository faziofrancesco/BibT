import React from "react";
import Tree from 'react-d3-tree';

export default function BinaryT({data}) {

    return (
        <Tree orientation={"vertical"}
              data={data}/>
    )
}