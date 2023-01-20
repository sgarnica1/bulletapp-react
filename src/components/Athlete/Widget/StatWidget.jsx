import React from "react";
import { DateWidget } from "../../Public/DateWidget";
import { utils } from "../../../utils/utils";
import CheckIcon from "../../../assets/icon/check-circle.svg";

const StatWidget = ({
  title,
  value,
  units,
  seconds,
  metaDescription,
  timescore,
  checkIcon = false,
}) => {
  const date = utils.formatDate(new Date(seconds * 1000));
  return (
    <div className="StatWidget">
      <div className="StatWidget__content">
        {checkIcon && (
          <img src={CheckIcon} alt="Check icon" className="StatWidget__icon" />
        )}
        <span className="StatWidget__meta-description">{metaDescription}</span>
        <p className={`StatWidget__title ${!value && "active"}`}>{title}</p>
        <span className="StatWidget__value">
          {timescore ? utils.secondsToTime(value) : value !== 0 ? value : ""}{" "}
          {timescore ? null : units}
        </span>
      </div>
      <DateWidget date={date} mb={false} />
    </div>
  );
};

export { StatWidget };
