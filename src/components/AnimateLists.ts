import React, { useState, useLayoutEffect, useEffect } from "react";
import usePrevious from "../hooks/usePrevious";
import calculateBoundingBoxes from "../helpers/calculateBoundingBoxes";

type ResultType = {
  [x: string]: any
};

const AnimateBubbles = ({ children }: any) => {
  // variable and state section
  const [boundingBox, setBoundingBox] = useState<ResultType>({});
  const [prevBoundingBox, setPrevBoundingBox] = useState<ResultType>({});
  const prevChildren = usePrevious(children);
  
  useLayoutEffect(() => {
    // calculate new bounding box
    const newBoundingBox = calculateBoundingBoxes(children);
    setBoundingBox(newBoundingBox);
  }, [children]);

  useLayoutEffect(() => {
    // calculate old bounding box
    const prevBoundingBox = calculateBoundingBoxes(prevChildren);
    setPrevBoundingBox(prevBoundingBox);
  }, [prevChildren]);

  useEffect(() => {
    // check the previous bounding box length
    const hasPrevBoundingBox = Object.keys(prevBoundingBox).length;
    if (hasPrevBoundingBox) {
      React.Children.forEach(children, (child) => {
        const domNode = child.ref.current;
        const firstBox = prevBoundingBox[child.key];
        const lastBox = boundingBox[child.key];
        const changeInX = firstBox.bottom - lastBox.bottom;

        // get difference between old box and new box for animate with change
        if (changeInX) {
          requestAnimationFrame(() => {
            domNode.style.transform = `translateY(${changeInX}px)`;
            domNode.style.transition = "transform 0s"; 

            requestAnimationFrame(() => {
              domNode.style.transform = "";
              domNode.style.transition = "transform 500ms";
            });
          });
        }
      });
    }
  }, [boundingBox, prevBoundingBox, children]);

  return children;
};

export default AnimateBubbles;
