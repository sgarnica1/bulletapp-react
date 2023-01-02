import React from "react";
// COMPONENTS
import { CardContainer } from "../Public/CardContainer";
// IMG
import ProgressBar from "react-bootstrap/ProgressBar";

const PersonalGoal = ({ link, date, description, status, progress }) => {
  return (
    <CardContainer link={link}>
      <div className="PersonalGoal">
        <h2 className="PersonalGoal__status-text">{status}</h2>
        <p className="PersonalGoal__title">{description}</p>
        <ProgressBar now={progress} />
        <p className="PersonalGoal__due-date">
          Fecha límite: <span>{date}</span>
        </p>
      </div>
    </CardContainer>
  );
};

export { PersonalGoal };
