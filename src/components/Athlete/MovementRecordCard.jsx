import React from "react";
import { utils } from "../../utils/utils";

const MovementRecordCard = ({
  dateInSeconds,
  sets,
  reps,
  weight,
  units,
  seconds,
  distance,
  timescore,
  distancescore,
  unlockedTag,
}) => {
  return (
    <div className="MovementRecordCard">
      <p className="MovementRecordCard__date">
        {utils.secondsToDate(dateInSeconds)}
      </p>
      {seconds > 0 && (
        <p className="MovementRecordCard__value">
          {utils.secondsToTime(seconds)}
          <span>
            {`${
              distance > 0 && sets > 0
                ? sets > 1
                  ? sets + " x " + distance + " " + units
                  : " / " + distance + " " + units
                : ""
            }`}
          </span>
        </p>
      )}
      {!unlockedTag &&
        !distancescore &&
        (parseInt(seconds) === 0 || isNaN(seconds)) && (
          <p className="MovementRecordCard__value">
            {sets} x {reps} {`${weight > 0 ? "@ " + weight + units : ""}`}
          </p>
        )}
      {distancescore && distance > 0 && parseInt(seconds) === 0 && (
        <p className="MovementRecordCard__value">
          {distance} {units}
        </p>
      )}
      {unlockedTag && (
        <p className="MovementRecordCard__value">
          <span>Desbloqueada</span>
        </p>
      )}
    </div>
  );
};

export { MovementRecordCard };
