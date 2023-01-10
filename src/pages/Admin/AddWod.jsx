import React from "react";

// COMPONENTS
import { AddWodForm } from "../../components/Admin/AddWodForm";
import { Banner } from "../../components/Public/Banner";
import { ContentContainer } from "../../components/Layout/ContentContainer";

const AddWod = () => {
  return (
    <div className="AddWod">
      <ContentContainer>
        <Banner title={"Añadir nuevo WOD"} description={""} />
        <AddWodForm />
      </ContentContainer>
    </div>
  );
};

export { AddWod };
