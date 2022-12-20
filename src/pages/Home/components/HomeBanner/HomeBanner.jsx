import { Datepicker } from "../../../../components/Datepicker/Datepicker";
import "./home-banner.scss";

function HomeBanner({ children, user }) {
  return (
    <main className="HomeBanner">
      <section className="HomeBanner__content">
        <div className="HomeBanner__welcome">
          <h1 className="HomeBanner__title">Bienvenido, {user}</h1>
          <h2 className="HomeBanner__description">Resumen mensual</h2>
        </div>
        <div className="HomeBanner__filters">
          <Datepicker />
        </div>
      </section>
      <section className="HomeBanner__stats">{children}</section>
    </main>
  );
}

export { HomeBanner };
