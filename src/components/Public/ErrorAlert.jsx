import ReactDom from "react-dom";
import { useEffect } from "react";
import { useDashboard } from "../../contexts/DashboardContext";
import TimesIcon from "../../assets/icon/close-white.svg";

const ErrorAlert = () => {
  const { errorMessage, setErrorMessage } = useDashboard();

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }, [errorMessage]);

  return ReactDom.createPortal(
    <div className={`ErrorAlert ${errorMessage && "show"}`}>
      <img src={TimesIcon} alt="times icon" className="ErrorAlert__icon" />
      <p className="ErrorAlert__message">{errorMessage}</p>
    </div>,
    document.getElementById("alert")
  );
};

export { ErrorAlert };
