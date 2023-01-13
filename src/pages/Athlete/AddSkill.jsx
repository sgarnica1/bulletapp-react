import React from "react";
import { info } from "../../utils/info";

// COMPONENTS
import { AddSkillForm } from "../../components/Athlete/AddRecord/AddSkillForm";
import { ContentContainer } from "../../components/Layout/ContentContainer";

const AddSkill = () => {
  return (
    <div className="AddSkill">
      <ContentContainer>
        <AddSkillForm previousRoute={info.routes.skills} />
      </ContentContainer>
    </div>
  );
};

export { AddSkill };
