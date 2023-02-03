import { useState } from "react";
import { utils } from "../../../utils/utils";

const DateScore = ({
  value,
  setValue,
  label,
  error,
  max,
  placeholder,
  readOnly = false,
}) => {
  const [type, setType] = useState("text");

  return (
    <div
      className={`InputScore datescore ${error && "error"} ${
        readOnly && "readonly"
      }`}
    >
      <input
        type={type}
        placeholder="dd/mm/aaaa"
        className="InputScore__input"
        name="score"
        value={value}
        max={max}
        min={0}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        onFocus={() => setType("date")}
        onBlur={() => (!value ? setType("text") : null)}
        readOnly={readOnly}
      />
      <label
        htmlFor="score"
        className="InputScore__label"
        onClick={() => {
          setValue(utils.formatISODate(new Date()));
        }}
      >
        HOY
      </label>
    </div>
  );
};

export { DateScore };
