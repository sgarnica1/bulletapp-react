import { info } from "../../utils/info";

// COMPONENTS
import { AddButton } from "../../components/Public/AddButton";
import { ContentContainer } from "../../components/Layout/ContentContainer";

// IMG
import GymImg from "../../assets/img/bullet-crossfit-gym.jpg";

const Skills = () => {
  return (
    <div className="Skills">
      <ContentContainer>
        <h1>Skills</h1>
        {/* ADD NEW PR */}
        <AddButton
          img={GymImg}
          alt="Bullet CrossFit Gym"
          title="Añadir habilidad desbloqueada"
          link={info.routes.addSkill}
        />
      </ContentContainer>
    </div>
  );
};

export { Skills };
