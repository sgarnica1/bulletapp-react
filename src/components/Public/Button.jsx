import { Link } from "react-router-dom";
import { info } from "../../utils/info";

const Button = ({
  type,
  text,
  link,
  size,
  style,
  fill,
  disabled,
  onClickHandler,
}) => {
  if (type === info.components.button.type.submit)
    return (
      <button
        type="submit"
        className={`Button ${size} ${style} ${fill ? "fill" : ""}`}
        disabled={disabled}
      >
        {text}
      </button>
    );

  if (type === info.components.button.type.link)
    return (
      <Link
        to={link}
        className={`Button ${size} ${style} ${fill ? "fill" : ""}`}
        onClick={onClickHandler}
      >
        {text}
      </Link>
    );

  if (type === info.components.button.type.href)
    return (
      <a
        href={link}
        className={`Button ${size} ${style} ${fill ? "fill" : ""}`}
        onClick={onClickHandler}
      >
        {text}
      </a>
    );

  return null;
};

export { Button };
