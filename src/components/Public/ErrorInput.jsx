import { Link } from "react-router-dom";

const ErrorInput = ({ errorMessage, show, linkTo, linkText }) => {
  return (
    <div className={`ErrorInput ${show && "show"}`}>
      <p className="ErrorInput__message">
        {errorMessage}. {"  "}
        {linkTo && (
          <span>
            <Link to={linkTo} className="ErrorInput__link">
              {linkText}
            </Link>
          </span>
        )}
      </p>
    </div>
  );
};

export { ErrorInput };
