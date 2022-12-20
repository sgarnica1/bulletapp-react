import "./cards-list.scss";

function CardsList({ children, title }) {
  return (
    <section className="CardsList">
      <h4 className="CardsList__header">{title}</h4>
      <div className="CardsList__container">{children}</div>
    </section>
  );
}

export { CardsList };
