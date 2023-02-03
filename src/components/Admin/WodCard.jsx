import React from "react";
import { CardContainer } from "../Public/CardContainer";
import { utils } from "../../utils/utils";

const WodCard = ({ wod, link }) => {
  return (
    <CardContainer link={link} extraClassName="fit-height">
      <div className={`WodCard`}>
        <div className="WodCard__content">
          <p className="WodCard__title">{wod.title}</p>
          <p className="WodCard__date">
            {utils.formatDateLong(new Date(wod.date.seconds * 1000))}
          </p>
          <div className="WodCard__categories">
            <span className="WodCard__category">{wod.category}</span>
          </div>

          <div className="WodCard__description">
            {wod?.description.split("\n").map((line, index) => (
              <p className="WodCard__description--line" key={index}>
                {line}
              </p>
            ))}
          </div>

          <div className="WodCard__timecap">
            <p>
              Time Cap: <span>{wod?.timecap} min</span>
            </p>
          </div>
        </div>
      </div>
    </CardContainer>
  );
};

export { WodCard };
