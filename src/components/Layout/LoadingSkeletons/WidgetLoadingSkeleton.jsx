import React from "react";

const WidgetLoadingSkeleton = ({ type = "form" }) => {
  if (type === "date")
    return <div className="WidgetLoadingSkeleton date"></div>;

  return (
    <div className={`WidgetLoadingSkeleton ${type}`}>
      <div className="WidgetLoadingSkeleton__title"></div>
      <div className="WidgetLoadingSkeleton__description"></div>
      <div className="WidgetLoadingSkeleton__input"></div>
    </div>
  );
};

export { WidgetLoadingSkeleton };
