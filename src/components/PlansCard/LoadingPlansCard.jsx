import "./plans-card.scss";

function LoadingPlansCard() {
  return (
    <article className="PlansCard PlansCard--loading">
      <div className="PlansCard__header">
        <div className="PlansCard__header-title"></div>
      </div>
      <div className="PlansCard__body">
        <div className="PlansCard__price"></div>
      </div>
      <div className="PlansCard__footer">
        <div className="PlansCard__footer-title"></div>
        <span className="PlansCard__footer-stats"></span>
      </div>
    </article>
  );
}

export { LoadingPlansCard };
