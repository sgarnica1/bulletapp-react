import { utils } from "../../../utils/utils";

const DateScore = ({ value, setValue, error, max, readOnly = false }) => {
  console.log(value);

  return (
    <div
      className={`InputScore datescore ${error && "error"} ${
        readOnly && "readonly"
      }`}
    >
      <input
        type="date"
        placeholder="dd/mm/aaaa"
        className="InputScore__input"
        name="score"
        value={value !== "" ? value : utils.formatISODate(new Date())}
        max={max}
        min={0}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        readOnly={readOnly}
      />
      <label
        htmlFor="score"
        className="InputScore__label"
        // onClick={() => {
        //   setValue(utils.formatISODate(new Date()));
        // }}
      >
        FECHA
      </label>
    </div>
  );
};

export { DateScore };
