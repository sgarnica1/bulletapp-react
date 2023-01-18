import React from "react";
import { CardContainer } from "../Public/CardContainer";
import { DateWidget } from "../Public/DateWidget";

import { utils } from "../../utils/utils";
import CheckIcon from "../../assets/icon/check-circle.svg";

const SkillCard = ({ title, seconds }) => {
  const date = utils.formatDate(new Date(seconds * 1000));

  return (
    <CardContainer>
      <div className="SkillCard">
        <div className="SkillCard__info">
          <p className="SkillCard__title">{title}</p>
          <DateWidget date={date} mb={false} />
        </div>
        <img src={CheckIcon} alt="Check mark" className="SkillCard__icon" />
      </div>
    </CardContainer>
  );
};

export { SkillCard };
