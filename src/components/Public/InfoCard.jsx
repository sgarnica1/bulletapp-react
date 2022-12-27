import { Link } from "react-router-dom";

const InfoCard = ({
  children,
  link,
  img,
  icon,
  alt,
  title,
  additionalInfo,
}) => {
  if (link)
    return (
      <Link to={link} className="InfoCard">
        <div className="InfoCard__img-container">
          <img
            src={img ? img : icon}
            alt={alt}
            className={img ? "InfoCard__img" : "InfoCard__icon"}
          />
        </div>
        <div className="InfoCard__info">
          <h3 className="InfoCard__title">{title}</h3>
          {additionalInfo && (
            <p className="InfoCard__additional-info">{additionalInfo}</p>
          )}
        </div>
      </Link>
    );

  return (
    <article className="InfoCard">
      <div className="InfoCard__img-container">
        <img
          src={img ? img : icon}
          alt={alt}
          className={img ? "InfoCard__img" : "InfoCard__icon"}
        />
      </div>
      <div className="InfoCard__info">
        <h3 className="InfoCard__title">{title}</h3>
        {additionalInfo && (
          <p className="InfoCard__additional-info">{additionalInfo}</p>
        )}
      </div>
      <div className="InfoCard__additional-component">{children}</div>
    </article>
  );
};

export { InfoCard };
