import { info } from "../../utils/info";

// COMPONENTS
import { AddButton } from "../../components/Public/AddButton";
import { ContentContainer } from "../../components/Layout/ContentContainer";

// IMG
import AthleteImg from "../../assets/img/athlete.jpg";

const PersonalRecords = () => {
  return (
    <div className="PersonalRecords">
      <ContentContainer>
        <h1>Personal Records</h1>
        {/* ADD NEW PR */}
        <AddButton
          img={AthleteImg}
          alt="CrossFit Athlete Front Rack Position"
          title="Añadir nuevo PR"
          link={info.routes.addPersonalRecord}
        />
      </ContentContainer>
    </div>
  );
};

export { PersonalRecords };
