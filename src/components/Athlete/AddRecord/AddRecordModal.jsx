import ReactDom from "react-dom";
import { useEffect, useState } from "react";
import { useDashboard } from "../../../contexts/DashboardContext";

import { AddRecordForm } from "./AddRecordForm";

// ICON
import CloseIcon from "../../../assets/icon/close.svg";

const AddRecordModal = ({ recordType }) => {
  const { showAddFormModal: show, setShowAddFormModal: setShow } =
    useDashboard();

  useEffect(() => {
    show
      ? document.body.classList.add("noscroll")
      : document.body.classList.remove("noscroll");
  }, [show]);

  return ReactDom.createPortal(
    <section className={`AddRecordModal ${show ? "show" : ""} `}>
      <div className="AddRecordModal__content">
        <div className="AddRecordModal__closebtn">
          <button onClick={() => setShow(false)}>
            <img src={CloseIcon} alt="Times icon" />
          </button>
        </div>
        <AddRecordForm recordType={recordType} closeModal={!show} />
      </div>
    </section>,
    document.getElementById("modal")
  );
};

export { AddRecordModal };
