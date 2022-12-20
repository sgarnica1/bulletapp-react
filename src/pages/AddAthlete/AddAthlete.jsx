import { ContentContainer } from "../../components/ContentContainer/ContentContainer";
import { Banner } from "../../components/Banner/Banner";
import { AddAthleteForm } from "../../components/AthleteForm/AddAthleteForm";

import "./addathlete.scss";

function AddAthlete() {
  return (
    <div className="AddAthlete">
      <Banner title={"Añadir Atletas"} description={"Agrega un nuevo atleta"} />
      <ContentContainer>
        <AddAthleteForm submitMethod={"post"} />
      </ContentContainer>
    </div>
  );
}

export { AddAthlete };
