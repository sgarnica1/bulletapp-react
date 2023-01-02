import ReactDom from "react-dom";
import { useEffect, useState } from "react";
import { useDashboard } from "../../contexts/DashboardContext";

// ICON
import CloseIcon from "../../assets/icon/close.svg";

const AddRecordFormContainer = ({ children }) => {
  const { showAddFormModal: show, setShowAddFormModal: setShow } =
    useDashboard();

  useEffect(() => {
    show
      ? document.body.classList.add("noscroll")
      : document.body.classList.remove("noscroll");
  }, [show]);

  return ReactDom.createPortal(
    <section className={`AddRecordFormContainer ${show ? "show" : ""} `}>
      <div className="AddRecordFormContainer__content">
        <div className="AddRecordFormContainer__closebtn">
          <button onClick={() => setShow(false)}>
            <img src={CloseIcon} alt="Times icon" />
          </button>
        </div>
        {children}
      </div>
    </section>,
    document.getElementById("modal")
  );
};

export { AddRecordFormContainer };
