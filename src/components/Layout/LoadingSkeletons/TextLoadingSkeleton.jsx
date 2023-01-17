import React from "react";

const TextLoadingSkeleton = ({ type = "title" }) => {
  return <div className={`TextLoadingSkeleton ${type}`}></div>;
};

export { TextLoadingSkeleton };
