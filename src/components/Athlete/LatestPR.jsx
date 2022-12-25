import React from "react";

const LatestPR = ({ title, value, units }) => {
  return (
    <div className="LatestPR">
      <p className="LatestPR__title">{title}</p>
      <span className="LatestPR__value">
        {value} {units}
      </span>
    </div>
  );
};

export { LatestPR };
