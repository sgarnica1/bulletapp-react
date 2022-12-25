import CalendarIcon from "../../assets/icon/calendar.svg";

function HomeBanner({ children, user }) {
  return (
    <section className="HomeBanner">
      <section className="HomeBanner__content">
        <div className="HomeBanner__welcome">
          <h1 className="HomeBanner__title">Hola, {user}</h1>
          <div className="HomeBanner__date">
            <img src={CalendarIcon} alt="Calendar icon" />
            <p>{new Date().toDateString()}</p>
          </div>
        </div>
      </section>
      <section className="HomeBanner__stats">{children}</section>
    </section>
  );
}

export { HomeBanner };
