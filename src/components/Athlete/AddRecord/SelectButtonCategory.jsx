import React from "react";
import SelectedIcon from "../../../assets/icon/selected.svg";
import UnSelectedIcon from "../../../assets/icon/unselected.svg";

const SelectButtonCategory = ({ selected, value, setValue }) => {
  return (
    <button
      className={`SelectButtonCategory ${selected && "selected"}`}
      type="button"
      onClick={() => setValue(value)}
    >
      <img
        className="SelectButtonCategory__icon"
        src={selected ? SelectedIcon : UnSelectedIcon}
        alt={selected ? "SelectedIcon" : "UnSelectedIcon"}
      />
      {value}
    </button>
  );
};

export { SelectButtonCategory };
