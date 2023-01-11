// UTILS
import { utils } from "../../utils/utils";

const AddRegisterWidgetContainer = ({
  children,
  title,
  description,
  date = false,
  error = false,
}) => {
  // TODO - Handle errors ui
  // TODO - Handle success ui

  return (
    <article className="AddRegisterWidget">
      <h1 className="AddRegisterWidget__title">{title}</h1>
      {date && (
        <div className="AddRegisterWidget__date">
          <p>{utils.getMonthYear()}</p>
        </div>
      )}
      <p className="AddRegisterWidget__description">{description}</p>
      {/* FORM */}
      {children}

      {/* BANNER ERROR */}
      {error && (
        <div className="AddRegisterWidget__error">
          <p className="AddRegisterWidget__error__text">
            Ocurrió un error, por favor vuelve a intentarlo
          </p>
        </div>
      )}
    </article>
  );
};

export { AddRegisterWidgetContainer };
