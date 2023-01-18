import React from "react";
import { info } from "../../utils/info";

// COMPONENTS
import { AddSkillForm } from "../../components/Athlete/AddRecord/AddSkillForm";
import { BackButton } from "../../components/Public/BackButton";
import { ContentContainer } from "../../components/Layout/ContentContainer";

const AddSkill = () => {
  return (
    <div className="AddSkill">
      <ContentContainer>
        <BackButton link={info.routes.skills.path} mb={true} />
        <AddSkillForm  />
      </ContentContainer>
    </div>
  );
};

export { AddSkill };
