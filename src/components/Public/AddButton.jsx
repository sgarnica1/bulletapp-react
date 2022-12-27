import { Link } from "react-router-dom";
import RightArrow from "../../assets/icon/right-arrow.svg";

const AddButton = ({ link, img, alt, title }) => {
  return (
    <Link to={link} className="AddButton">
      <img src={img} alt={alt} className="AddButton__img" />
      <div className="AddButton__info">
        <p className="AddButton__title">{title}</p>
        <img
          src={RightArrow}
          alt="Right Green Arrow"
          className="AddButton__icon"
        />
      </div>
    </Link>
  );
};

export { AddButton };
