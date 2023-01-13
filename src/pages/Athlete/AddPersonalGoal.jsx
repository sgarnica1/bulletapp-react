import React from "react";
import { info } from "../../utils/info";

// COMPONENTS
import { AddPersonalGoalForm } from "../../components/Athlete/AddRecord/AddPersonalGoalForm";
import { ContentContainer } from "../../components/Layout/ContentContainer";

const AddPersonalGoal = () => {
  return (
    <div className="AddPersonalGoal">
      <ContentContainer>
        <AddPersonalGoalForm previousRoute={info.routes.personalGoals} />
      </ContentContainer>
    </div>
  );
};

export { AddPersonalGoal };
