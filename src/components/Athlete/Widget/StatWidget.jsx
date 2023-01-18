import React from "react";
import { CardContainer } from "../../Public/CardContainer";
import { DateWidget } from "../../Public/DateWidget";
import { utils } from "../../../utils/utils";

const StatWidget = ({
  link,
  title,
  value,
  units,
  seconds,
  metaDescription,
  scoreType,
}) => {
  const date = utils.formatDate(new Date(seconds * 1000));
  return (
    <div className="StatWidget">
      <span className="StatWidget__meta-description">{metaDescription}</span>
      <p className={`StatWidget__title ${!value && "active"}`}>{title}</p>
      <span className="StatWidget__value">
        {scoreType === "time" ? utils.secondsToTime(value) : value}{" "}
        {scoreType === "time" ? null : units}
      </span>
      <DateWidget date={date} mb={false} />
    </div>
  );
};

export { StatWidget };
