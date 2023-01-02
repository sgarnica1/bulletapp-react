import { DateWidget } from "./DateWidget";
import { utils } from "../../utils/utils";

function HomeBanner({ children, user }) {
  return (
    <section className="HomeBanner">
      <section className="HomeBanner__content">
        <div className="HomeBanner__welcome">
          <h1 className="HomeBanner__title">Hola, {user}</h1>
          <DateWidget date={utils.getCurrentDate()} color="green" />
        </div>
      </section>
      <section className="HomeBanner__stats">{children}</section>
    </section>
  );
}

export { HomeBanner };
