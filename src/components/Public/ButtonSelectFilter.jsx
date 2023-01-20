import CancelIcon from "../../assets/icon/close.svg";
import { info } from "../../utils/info";

const ButtonSelectFilter = ({
  options,
  value,
  setValue,
  setSearch,
  loading,
}) => {
  const all = info.components.buttonSelectFilter.values.all

  if (loading)
    return (
      <div className="ButtonSelectFilter">
        <div
          className={`ButtonSelectFilter__input-container ${
            value !== all ? "translate" : ""
          } ${loading && "loading"}`}
        >
          {new Array(3).fill(0).map((_, index) => {
            return (
              <p className="ButtonSelectFilter__input loading" key={index}></p>
            );
          })}
        </div>
      </div>
    );

  return (
    <div className={`ButtonSelectFilter ${value !== all ? "move" : ""}`}>
      <button
        className={`ButtonSelectFilter__input-close ${
          value !== all ? "show" : ""
        }`}
        onClick={() => {
          setValue(all);
          setSearch("");
        }}
      >
        <img src={CancelIcon} alt="Cancel icon" />
      </button>
      <div
        className={`ButtonSelectFilter__input-container ${
          value !== all ? "translate" : ""
        }`}
      >
        {options.map((item, index) => {
          if (value !== all && item === value) {
            return (
              <button
                className={`ButtonSelectFilter__input ${
                  item === value ? "active" : ""
                }`}
                key={index}
                onClick={() => setValue(item)}
              >
                {item}
              </button>
            );
          }

          if (value === all) {
            return (
              <button
                className={`ButtonSelectFilter__input ${
                  item === value ? "active" : ""
                }`}
                key={index}
                onClick={() => setValue(item)}
              >
                {item}
              </button>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};

export { ButtonSelectFilter };
