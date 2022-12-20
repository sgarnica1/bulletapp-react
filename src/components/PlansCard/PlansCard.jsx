import { useEffect } from "react";
import { useAthletes } from "../../hooks/useAthletes";
import "./plans-card.scss";

function PlansCard({ id, title, price }) {
  const { athletes, actions } = useAthletes();

  useEffect(() => {
    actions.getAthletesByPlan(id);
  }, []);

  return (
    <article className="PlansCard">
      <div className="PlansCard__header">
        <h5 className="PlansCard__header-title">{title}</h5>
      </div>
      <div className="PlansCard__body">
        <p className="PlansCard__price">{price}</p>
      </div>
      <div className="PlansCard__footer">
        <h4 className="PlansCard__footer-title">Atletas inscritos</h4>
        <span className="PlansCard__footer-stats">{athletes?.length}</span>
      </div>
    </article>
  );
}

export { PlansCard };
