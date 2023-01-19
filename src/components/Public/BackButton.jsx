import { Link } from "react-router-dom";
import BackArrowIcon from "../../assets/icon/back-arrow.svg";

const BackButton = ({ link, text, mb, mt, onClickCallback, navigate }) => {
  if (navigate)
    return (
      <button onClick={navigate} className={`BackButton ${mb && "mb"} ${mt && "mt"}`}>
        <img
          className="BackButton__icon"
          src={BackArrowIcon}
          alt="Left green arrow"
          onClick={(e) => {
            if (onClickCallback) onClickCallback(e);
          }}
        />
        {text && <span className="BackButton__text">{text}</span>}
      </button>
    );
  return (
    <Link to={link} className={`BackButton ${mb && "mb"} ${mt && "mt"}`}>
      <img
        className="BackButton__icon"
        src={BackArrowIcon}
        alt="Left green arrow"
        onClick={(e) => {
          if (onClickCallback) onClickCallback(e);
        }}
      />
      {text && <span className="BackButton__text">{text}</span>}
    </Link>
  );
};

export { BackButton };
