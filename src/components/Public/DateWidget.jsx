import CalendarIconGray from "../../assets/icon/calendar-gray.svg";
import CalendarIconGreen from "../../assets/icon/calendar-green.svg";
import CalendarIconWhite from "../../assets/icon/calendar-white.svg";

const DateWidget = ({ color = "gray", date, mb = true }) => {
  let icon = CalendarIconGray;

  if (color == "green") icon = CalendarIconGreen;
  if (color == "white") icon = CalendarIconWhite;

  return (
    <div className={`DateWidget ${mb ? "mb" : ""}`}>
      <img src={icon} alt="Calendar icon" />
      <p>{date}</p>
    </div>
  );
};

export { DateWidget };
