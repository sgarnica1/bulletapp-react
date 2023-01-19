// UTILS
import { utils } from "../../../utils/utils";

const FormWidgetContainer = ({
  children,
  title,
  description,
  date = false,
  error = false,
}) => {
  // TODO - Handle errors ui
  // TODO - Handle success ui

  return (
    <article className="FormWidgetContainer">
      <h1 className="FormWidgetContainer__title">{title}</h1>
      {date && (
        <div className="FormWidgetContainer__date">
          <p>{utils.getMonthYear()}</p>
        </div>
      )}
      <p className="FormWidgetContainer__description">{description}</p>
      {/* FORM */}
      {children}

      {/* BANNER ERROR */}
      {error && (
        <div className="FormWidgetContainer__error">
          <p className="FormWidgetContainer__error__text">
            Ocurrió un error, por favor vuelve a intentarlo
          </p>
        </div>
      )}
    </article>
  );
};

export { FormWidgetContainer };
