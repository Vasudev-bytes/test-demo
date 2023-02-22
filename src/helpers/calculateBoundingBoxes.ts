import React from "react";

type ResultType = {
    [x: string]: any
};

// calculate old and new box here
const calculateBoundingBoxes = (children: any) => {
    const boundingBoxes: ResultType = {};
    React.Children.forEach(children, child => {
        const domNode = child.ref.current;
        const nodeBoundingBox = domNode.getBoundingClientRect();
        boundingBoxes[child.key] = nodeBoundingBox;
    });
    return boundingBoxes;
};

export default calculateBoundingBoxes;
