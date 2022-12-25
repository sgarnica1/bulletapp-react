import { Link } from "react-router-dom";

function StatCard({ children, route, title, data, additionalInfo }) {
  return (
    <Link className="StatCard" to={route}>
      <h2 className="StatCard__title">{title}</h2>
      {data && <p className="StatCard__number">{data}</p>}
      {children}
      {additionalInfo && (
        <p className="StatCard__additional-info">{additionalInfo}</p>
      )}
    </Link>
  );
}

export { StatCard };
