import { Link } from "react-router-dom";
import BackArrowIcon from "../../assets/icon/back-arrow.svg";

const BackButton = ({ link, text, mb, mt }) => {
  return (
    <Link to={link} className={`BackButton ${mb && "mb"} ${mt && "mt"}`}>
      <img
        className="BackButton__icon"
        src={BackArrowIcon}
        alt="Left green arrow"
      />
      {text && <span className="BackButton__text">{text}</span>}
    </Link>
  );
};

export { BackButton };
