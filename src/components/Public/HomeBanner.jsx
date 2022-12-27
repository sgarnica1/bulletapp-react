import CalendarIcon from "../../assets/icon/calendar.svg";
import { utils } from "../../utils/utils";

function HomeBanner({ children, user }) {
  const currentDate = new Date();

  return (
    <section className="HomeBanner">
      <section className="HomeBanner__content">
        <div className="HomeBanner__welcome">
          <h1 className="HomeBanner__title">Hola, {user}</h1>
          <div className="HomeBanner__date">
            <img src={CalendarIcon} alt="Calendar icon" />
            <p>{utils.getCurrentDate()}</p>
          </div>
        </div>
      </section>
      <section className="HomeBanner__stats">{children}</section>
    </section>
  );
}

export { HomeBanner };
