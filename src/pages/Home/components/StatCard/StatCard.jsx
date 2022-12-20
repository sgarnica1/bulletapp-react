import { Link } from "react-router-dom";
import "./statcard.scss";

function StatCard({ title, data, route }) {
  return (
    <Link className="StatCard" to={route}>
      <div className="StatCard__info">
        <p className="StatCard__title">{title}</p>
        <span className="StatCard__number">{data}</span>
      </div>
      <div className="StatCard__button">
        <span></span>
      </div>
    </Link>
  );
}

export { StatCard };
