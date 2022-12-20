import { Link } from "react-router-dom";
import { useDashboard } from "../../contexts/DashboardContext";
import { EmptyAthleteRow } from "./EmptyAthleteRow";
import { LoadingAthleteRow } from "./LoadingAthleteRow";
import "./athletes-list.scss";

function AthletesList(props) {
  const { setActiveView } = useDashboard();

  if (props.error) {
    return props.onError();
  }

  if (props.loading) {
    return (
      <div className="AthletesList__list">
        {new Array(5).fill().map((_, index) => (
          <LoadingAthleteRow key={index} />
        ))}
      </div>
    );
  }

  const renderFunc = props.children ? props.children : props.render;

  return (
    <article className="AthletesList">
      <div className="AthletesList__header">
        <h3 className="AthletesList__header-title">{props.title}</h3>
        <Link
          to={props.route}
          className="AthletesList__header-button"
          onClick={() => setActiveView(props.activeView)}
        >
          <span className="header-button-text">Ver todo</span>
          <span className="header-button-icon"></span>
        </Link>
      </div>

      <div className="AthletesList__list">
        {props.header && (
          <div className="AthletesList__headers">
            <p className="AthletesList__headers-title">Atletas</p>
            <p className="AthletesList__headers-title">Fecha</p>
            <p className="AthletesList__headers-title">Plan</p>
            <p className="AthletesList__headers-title">{props.header}</p>
          </div>
        )}
        {props.data?.length < 1 && (
          <EmptyAthleteRow message={"No hay información registrada todavía"} />
        )}
        {props.data?.map(renderFunc)}
      </div>
    </article>
  );
}

export { AthletesList };
