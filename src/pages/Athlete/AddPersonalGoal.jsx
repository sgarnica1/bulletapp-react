import React from "react";
import { info } from "../../utils/info";

// COMPONENTS
import { AddPersonalGoalForm } from "../../components/Athlete/AddRecord/AddPersonalGoalForm";
import { BackButton } from "../../components/Public/BackButton";
import { ContentContainer } from "../../components/Layout/ContentContainer";

const AddPersonalGoal = () => {
  return (
    <div className="AddPersonalGoal">
      <ContentContainer>
        <BackButton link={info.routes.personalGoals} mb={true} />
        <AddPersonalGoalForm />
      </ContentContainer>
    </div>
  );
};

export { AddPersonalGoal };
