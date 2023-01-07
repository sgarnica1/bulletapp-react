import SearchIcon from "../../../assets/icon/search.svg";

const InputLoadingSkeleton = ({ type = "input" }) => {
  return (
    <div
      className={`InputLoadingSkeleton ${type === "searchBar" && "search-bar"}`}
    >
      {type === "searchBar" && (
        <img
          src={SearchIcon}
          alt="Search Icon"
          className="InputLoadingSkeleton__icon"
        />
      )}
      {type === "input" && (
        <div className="InputLoadingSkeleton__content">
          <div className="InputLoadingSkeleton__input"></div>
          <div className="InputLoadingSkeleton__input"></div>
          <div className="InputLoadingSkeleton__input"></div>
        </div>
      )}
    </div>
  );
};

export { InputLoadingSkeleton };
