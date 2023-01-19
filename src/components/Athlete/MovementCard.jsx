import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { CardContainer } from "../Public/CardContainer";

// UTILS
import { info } from "../../utils/info";
import LockIcon from "../../assets/icon/lock.svg";

const MovementCard = ({
  link,
  title,
  categories,
  unlockedSkill,
  skillsOnly,
}) => {
  const skillsRef = info.firebase.values.movementCategories.skills;
  const locked = categories.includes(skillsRef) && !unlockedSkill;

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Da clic para desbloquear
    </Tooltip>
  );

  // const locked = false;
  return (
    <CardContainer link={link}>
      <div className={`MovementCard ${locked && skillsOnly && "locked"}`}>
        <div className="MovementCard__content">
          <p className="MovementCard__title">{title}</p>
          <div className="MovementCard__categories">
            {categories.map((cat, index) => (
              <span className="MovementCard__category" key={index}>
                {cat}
              </span>
            ))}
          </div>
        </div>
        {locked && skillsOnly && (
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
          >
            <img
              src={LockIcon}
              alt="Lock icon"
              className="MovementCard__icon"
            />
          </OverlayTrigger>
        )}
      </div>
    </CardContainer>
  );
};

export { MovementCard };
