import React from "react";
import { info } from "../../utils/info";

// COMPONENTS
import { AddPersonalRecordForm } from "../../components/Athlete/AddRecord/AddPersonalRecordForm";
import { ContentContainer } from "../../components/Layout/ContentContainer";

const AddPersonalRecord = () => {
  return (
    <div className="AddPersonalRecord">
      <ContentContainer>
        <AddPersonalRecordForm previousRoute={info.routes.prs} />
      </ContentContainer>
    </div>
  );
};

export { AddPersonalRecord };
