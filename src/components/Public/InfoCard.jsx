import { Link } from "react-router-dom";
import { CardContainer } from "./CardContainer";

const InfoCard = ({
  children,
  link,
  img,
  icon,
  alt,
  title,
  additionalInfo,
  onClickHandler,
}) => {
  return (
    <CardContainer link={link}>
      <article
        className={`InfoCard ${onClickHandler ? "button" : ""}`}
        onClick={onClickHandler}
      >
        {(img || icon) && (
          <div className="InfoCard__img-container">
            <img
              src={img ? img : icon}
              alt={alt}
              className={img ? "InfoCard__img" : "InfoCard__icon"}
            />
          </div>
        )}
        {!img && !icon && (
          <div className="InfoCard__img-container">
            <p className="InfoCard__img-placeholder">{title[0]}</p>
          </div>
        )}
        <div className="InfoCard__info">
          <h3 className="InfoCard__title">{title}</h3>
          {additionalInfo && (
            <p className="InfoCard__additional-info">{additionalInfo}</p>
          )}
        </div>
        <div className="InfoCard__additional-component">{children}</div>
      </article>
    </CardContainer>
  );
};

export { InfoCard };
