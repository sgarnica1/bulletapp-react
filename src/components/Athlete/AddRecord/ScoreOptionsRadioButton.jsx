import React from "react";
import { info } from "../../../utils/info";

const ScoreOptionsRadioButton = ({
  currentRecordCategory,
  setRecordCategory,
  setScoreType,
  enableNoScoreOption = false,
}) => {
  return (
    <div className="AddRecordForm__radio-btn">
      {Object.values(info.firebase.values.recordCategories).map(
        (cat, index) => {
          if (!enableNoScoreOption && cat.score_type === "") return null;
          if (cat.active) {
            return (
              <div
                className="AddRecordForm__radio-btn-container"
                key={index}
                onClick={() => {
                  setRecordCategory(cat.name);
                  setScoreType(cat.score_type);
                }}
              >
                <div
                  className={`AddRecordForm__radio-btn__input ${
                    currentRecordCategory === cat.name ? "active" : ""
                  }`}
                >
                  <span></span>
                </div>
                <p className="AddRecordForm__radio-btn__label">{cat.name}</p>
              </div>
            );
          }
          return null;
        }
      )}
    </div>
  );
};

export { ScoreOptionsRadioButton };
