import { useDashboard } from "../../contexts/DashboardContext";
import { CardContainer } from "./CardContainer";

const AddButton = ({ link, img, alt, title, clickHandler }) => {
  return (
    <CardContainer
      link={link}
      clickHandler={clickHandler ? clickHandler : null}
    >
      <div className="AddButton">
        {img && <img src={img} alt={alt} className="AddButton__img" />}
        <p className="AddButton__title">{title}</p>
      </div>
    </CardContainer>
  );
};

export { AddButton };
