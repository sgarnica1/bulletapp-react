import { ContentContainer } from "../../components/Layout/ContentContainer";
import { Banner } from "../../components/Public/Banner";
import { AddAthleteForm } from "../../components/Admin/AddAthleteForm";

function AddAthlete() {
  return (
    <div className="AddAthlete">
      <ContentContainer>
        <Banner title={"Añadir nuevo atleta"} description={""} />
        <AddAthleteForm />
      </ContentContainer>
    </div>
  );
}

export { AddAthlete };
