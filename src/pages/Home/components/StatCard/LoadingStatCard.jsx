import "./statcard.scss";

function LoadingStatCard() {
  return (
    <div className="StatCard StatCard--loading">
      <div className="StatCard__info">
        <div className="StatCard__title"></div>
        <div className="StatCard__number"></div>
      </div>
      <div className="StatCard__button">
        <span></span>
      </div>
    </div>
  );
}

export { LoadingStatCard };
