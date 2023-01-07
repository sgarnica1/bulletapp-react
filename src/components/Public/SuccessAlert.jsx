import ReactDom from "react-dom";
import { useEffect } from "react";
import { useDashboard } from "../../contexts/DashboardContext";
import CheckIcon from "../../assets/icon/check-white.svg";

const SuccessAlert = () => {
  const { successMessage, setSuccessMessage } = useDashboard();

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  }, [successMessage]);

  return ReactDom.createPortal(
    <div className={`SuccessAlert ${successMessage && "show"}`}>
      <img src={CheckIcon} alt="check" className="SuccessAlert__icon" />
      <p className="SuccessAlert__message">{successMessage}</p>
    </div>,
    document.getElementById("alert")
  );
};

export { SuccessAlert };
