import { ContentContainer } from "../../components/Layout/ContentContainer";
import { Banner } from "../../components/Public/Banner";
import { AddAthleteForm } from "../../components/Admin/AddAthleteForm";

function AddAthlete() {
  return (
    <div className="AddAthlete">
      <Banner title={"Añadir nuevo atleta"} description={""} />
      <ContentContainer>
        <AddAthleteForm submitMethod={"post"} />
      </ContentContainer>
    </div>
  );
}

export { AddAthlete };
