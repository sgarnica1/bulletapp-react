import React from "react";
import { CardContainer } from "../Public/CardContainer";
import { DateWidget } from "../Public/DateWidget";

const SkillCard = ({ link, title, value, units, date, latest }) => {
  return (
    <CardContainer link={link}>
      <div className="SkillCard">
        <p className="PRCard__title">{title}</p>
        <DateWidget date={date} mb={false} />
      </div>
    </CardContainer>
  );
};

export { SkillCard };
