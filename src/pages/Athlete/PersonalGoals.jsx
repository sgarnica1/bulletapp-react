import { info } from "../../utils/info";

// COMPONENTS
import { AddButton } from "../../components/Public/AddButton";
import { ContentContainer } from "../../components/Layout/ContentContainer";

// IMG
import AthleteImg from "../../assets/img/athlete_2.jpg";

const PersonalGoals = () => {
  return (
    <div className="PersonalGoals">
      <ContentContainer>
        <h1>Metas Personales</h1>
        {/* ADD NEW PR */}
        <AddButton
          img={AthleteImg}
          alt="Bullet CrossFit shirt"
          title="Añadir meta personal"
          link={info.routes.addPersonalGoal}
        />
      </ContentContainer>
    </div>
  );
};

export { PersonalGoals };
