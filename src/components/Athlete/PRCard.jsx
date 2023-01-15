import React from "react";
import { CardContainer } from "../Public/CardContainer";
import { DateWidget } from "../Public/DateWidget";

import { utils } from "../../utils/utils";

const PRCard = ({ link, title, value, units, seconds, latest, scoreType }) => {
  const date = utils.formatDate(new Date(seconds * 1000));

  return (
    <CardContainer link={link}>
      <div className="PRCard">
        {latest && <h2 className="PRCard__description">Tu PR más reciente</h2>}
        <p className="PRCard__title">{title}</p>
        <span className="PRCard__value">
          {scoreType === "time" ? utils.secondsToTime(value) : value}{" "}
          {scoreType === "time" ? null : units}
        </span>
        <DateWidget date={date} mb={false} />
      </div>
    </CardContainer>
  );
};

export { PRCard };
