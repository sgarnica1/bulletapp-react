import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

const MonthlyGoal = ({ description, status }) => {
  return (
    <div className="MonthlyGoal">
      <p className="MonthlyGoal__title">{description}</p>
      <ProgressBar now={60} />
    </div>
  );
};

export { MonthlyGoal };
