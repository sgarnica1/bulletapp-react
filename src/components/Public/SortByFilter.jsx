import React from "react";
import { info } from "../../utils/info";

const SortByFilter = ({ setValue, loading }) => {
  return (
    <div className={`SortByFilter ${loading && "loading"}`}>
      <select
        className="SortByFilter__select "
        onChange={(e) => setValue(e.target.value)}
      >
        <option
          value={info.components.sortby.label}
          className="SortByFilter__option"
        >
          {!loading ? info.components.sortby.label : ""}
        </option>
        {Object.values(info.components.sortby.options).map((option, index) => (
          <option value={option} className="SortByFilter__option" key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export { SortByFilter };
