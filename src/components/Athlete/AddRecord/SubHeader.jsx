import React from "react";

const SubHeader = ({ title, description }) => {
  return (
    <header className="AddRecordForm__header">
      <h2 className="AddRecordForm__title">{title}</h2>
      <p className="AddRecordForm__description">{description}</p>
    </header>
  );
};

export { SubHeader };
