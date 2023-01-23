import { Link } from "react-router-dom";
import { DateWidget } from "../../Public/DateWidget";
import { utils } from "../../../utils/utils";
import CheckIcon from "../../../assets/icon/check-circle.svg";

const StatWidget = ({
  link,
  title,
  metaDescription,
  score,
  distancescore,
  timescore,
  checkIcon = false,
  dateInSeconds = false,
}) => {
  let date;
  if (score) date = utils.formatDate(new Date(score.date.seconds * 1000));
  if (dateInSeconds) date = utils.formatDate(new Date(dateInSeconds * 1000));

  return (
    <Link to={link ? link : "#"} className="StatWidget">
      <div className="StatWidget__content">
        {checkIcon && (
          <img src={CheckIcon} alt="Check icon" className="StatWidget__icon" />
        )}
        <span className="StatWidget__meta-description">{metaDescription}</span>
        <p className={`StatWidget__title ${score && !score.reps && "active"}`}>
          {title}
        </p>

        {score && score.reps && (
          <div className="StatWidget__value-container">
            {score.seconds > 0 && (
              <p className="StatWidget__value">
                {utils.secondsToTime(score.seconds)}

                <span className="StatWidget__value-span">
                  {`${
                    score.distance > 0 && score.sets > 0
                      ? score.sets > 1
                        ? score.sets +
                          " x " +
                          score.distance +
                          " " +
                          score.units
                        : score.distance + " " + score.units
                      : ""
                  }`}
                </span>
              </p>
            )}

            {/* 1RM */}
            {!score.seconds &&
              !distancescore &&
              !timescore &&
              score.units !== "reps" &&
              score.reps === 1 &&
              score.sets === 1 && (
                <p className="StatWidget__value--unique">
                  {score.weight} {score.units}
                </p>
              )}

            {/* Weight history */}
            {!score.seconds &&
              !distancescore &&
              (score.reps > 1 || score.sets > 1) &&
              score.weight > 0 &&
              parseInt(score.seconds) === 0 && (
                <p className="StatWidget__value--unique">
                  {score.weight} {score.units}
                </p>
              )}

            {/* Sets history */}
            {!score.seconds &&
              !distancescore &&
              (score.reps > 1 || score.sets > 1) &&
              score.weight === 0 &&
              parseInt(score.seconds) === 0 && (
                <p className="StatWidget__value--unique">
                  {score.sets} x {score.reps}
                </p>
              )}

            {/* Distance history */}
            {distancescore &&
              score.distance > 0 &&
              parseInt(score.seconds) === 0 && (
                <p className="StatWidget__value">
                  {score.distance} {score.units}
                </p>
              )}
          </div>
        )}
      </div>
      <DateWidget date={date} mb={false} />
    </Link>
  );
};

export { StatWidget };
