import React from "react";
import { utils } from "../../utils/utils";

const MovementRecordCard = ({
  dateInSeconds,
  sets,
  reps,
  weight,
  units,
  seconds,
}) => {
  return (
    <div className="MovementRecordCard">
      <p className="MovementRecordCard__date">
        {utils.secondsToDate(dateInSeconds)}
      </p>
      {seconds > 0 && (
        <p className="MovementRecordCard__value">
          {utils.secondsToTime(seconds)}
        </p>
      )}
      {!seconds && parseInt(seconds) === 0 && (
        <p className="MovementRecordCard__value">
          {sets} x {reps} {`${weight > 0 ? "@ " + weight + units : ""}`}
        </p>
      )}
    </div>
  );
};

export { MovementRecordCard };
