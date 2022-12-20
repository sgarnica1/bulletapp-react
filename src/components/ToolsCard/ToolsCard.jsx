import "./tools-card.scss";

function ToolsCard({ route, title, styleClass }) {
  return (
    <article className={`ToolsCard ${styleClass}`}>
      <a href={route} className="ToolsCard__container">
        <p className="ToolsCard__title">{title}</p>
      </a>
    </article>
  );
}

export { ToolsCard };
