import { Link } from "react-router-dom";

const Button = ({ type, text, link, size, style, fill, onClickHandler }) => {
  if (type === "submit")
    return (
      <button
        type="submit"
        className={`Button ${size} ${style} ${fill ? "fill" : ""}`}
      >
        {text}
      </button>
    );

  return (
    <Link
      to={link}
      className={`Button ${size} ${style} ${fill ? "fill" : ""}`}
      onClick={onClickHandler}
    >
      {text}
    </Link>
  );
};

export { Button };
