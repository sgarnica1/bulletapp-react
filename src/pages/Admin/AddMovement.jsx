import React from "react";

// COMPONENTS
import { AddMovementForm } from "../../components/Admin/AddMovementForm";
import { Banner } from "../../components/Public/Banner";
import { ContentContainer } from "../../components/Layout/ContentContainer";

const AddMovement = () => {
  return (
    <div className="AddMovement">
      <ContentContainer>
        <Banner title={"Añadir movimiento"} description={""} />
        <AddMovementForm />
      </ContentContainer>
    </div>
  );
};

export { AddMovement };
