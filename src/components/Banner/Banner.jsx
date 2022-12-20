import "./banner.scss";

function Banner({ title, description }) {
  return (
    <main className="Banner">
      <section className="Banner__content">
        <div className="Banner__welcome">
          <h1 className="Banner__title">{title}</h1>
          <h2 className="Banner__description">{description}</h2>
        </div>
      </section>
    </main>
  );
}

export { Banner };
