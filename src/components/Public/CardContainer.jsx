import { Link } from "react-router-dom";
import { useDashboard } from "../../contexts/DashboardContext";

// UTILS
import { info } from "../../utils/info";

// ICON
import RightArrow from "../../assets/icon/right-arrow.svg";

function CardContainer({ children, link, clickHandler, extraClassName = "" }) {
  const { setActiveView } = useDashboard();

  const onClickChangeView = () => {
    for (const route in info.routes)
      if (info.routes[route] === link) setActiveView(info.views[route]);
  };

  if (link)
    return (
      <Link
        className={`CardContainer ${extraClassName}`}
        to={link}
        onClick={onClickChangeView}
      >
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
