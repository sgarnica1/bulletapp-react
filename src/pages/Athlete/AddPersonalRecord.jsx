import React from "react";
import { info } from "../../utils/info";

// COMPONENTS
import { AddPersonalRecordForm } from "../../components/Athlete/AddRecord/AddPersonalRecordForm";
import { BackButton } from "../../components/Public/BackButton";
import { ContentContainer } from "../../components/Layout/ContentContainer";

const AddPersonalRecord = () => {
  return (
    <div className="AddPersonalRecord">
      <ContentContainer>
        <BackButton link={info.routes.prs} mb={true} />
        <AddPersonalRecordForm />
      </ContentContainer>
    </div>
  );
};

export { AddPersonalRecord };
