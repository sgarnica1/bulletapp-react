import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import "./datepicker.scss";

function Datepicker() {
  const [date, setDate] = useState(new Date());
  return (
    <div className="Datepicker">
      <span className="Datepicker__icon"></span>
      <Flatpickr
        className="Datepicker__input"
        value={date}
        onChange={([date]) => setDate(date)}
        options={{
          mode: "single",
          dateFormat: "d-M-y",
          altInput: true,
          disableMobile: true,
        }}
      />
    </div>
  );
}

export { Datepicker };
