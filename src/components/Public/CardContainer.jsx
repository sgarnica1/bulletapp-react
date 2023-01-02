import { Link } from "react-router-dom";
import RightArrow from "../../assets/icon/right-arrow.svg";

function CardContainer({ children, link, clickHandler, extraClassName = "" }) {
  if (link)
    return (
      <Link className={`CardContainer ${extraClassName}`} to={link}>
        {children}
        <img
          src={RightArrow}
          alt="Right Green Arrow"
          className="CardContainer__icon-arrow"
        />
      </Link>
    );

  if (clickHandler)
    return (
      <button
        className={`CardContainer ${extraClassName}`}
        onClick={clickHandler}
      >
        {children}
        <img
          src={RightArrow}
          alt="Right Green Arrow"
          className="CardContainer__icon-arrow"
        />
      </button>
    );

  return <div className="CardContainer">{children}</div>;
}

export { CardContainer };
