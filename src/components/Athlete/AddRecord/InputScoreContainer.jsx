import React from "react";

const InputScoreContainer = ({ children, gridColumns }) => {
  return (
    <div className={`InputScoreContainer grid-col-${gridColumns}`}>{children}</div>
  );
};

export { InputScoreContainer };
