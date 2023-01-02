import React from "react";
import { CardContainer } from "../Public/CardContainer";
import { DateWidget } from "../Public/DateWidget";

const PRCard = ({ link, title, value, units, date, latest }) => {
  return (
    <CardContainer link={link}>
      <div className="PRCard">
        {latest && (
          <h2 className="PRCard__description">Tu PR más reciente</h2>
        )}
        <p className="PRCard__title">{title}</p>
        <span className="PRCard__value">
          {value} {units}
        </span>
        <DateWidget date={date} mb={false}/>
      </div>
    </CardContainer>
  );
};

export { PRCard };
