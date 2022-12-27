import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { info } from "../../utils/info";
import { utils } from "../../utils/utils";

// Components
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { HomeBanner } from "../../components/Public/HomeBanner";
import { WodScoreWidget } from "../../components/Athlete/WodScoreWidget";
import { BulletGoalWidget } from "../../components/Athlete/BulletGoalWidget";
import { StatCard } from "../../components/Public/StatCard";
import { LatestPR } from "../../components/Athlete/LatestPR";
import { MonthlyGoal } from "../../components/Athlete/MonthlyGoal";
import { AddButton } from "../../components/Public/AddButton";
import { InfoCard } from "../../components/Public/InfoCard";

// IMG
import GymImg from "../../assets/img/bullet-crossfit-gym.jpg";
import AthleteImg from "../../assets/img/athlete.jpg";
import HoodiesImg from "../../assets/img/sudaderas.jpg";
import UserIcon from "../../assets/icon/user.svg";

function Home() {
  const { user, loading, error } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (error) navigate("/server-error");
  // }, [error]);

  // TODO - Add loading state
  return (
    <div className="Home">
      {/* HOME BANNER */}
      {loading && <HomeBanner user={"Loading..."}></HomeBanner>}
      {error && !loading && <HomeBanner user={""}></HomeBanner>}
      {!error && !loading && (
        <HomeBanner
          user={
            user?.data?.first_name
              ? user.data[info.firebase.docKeys.users.firstName]
              : user.data[info.firebase.docKeys.users.email]
          }
        ></HomeBanner>
      )}

      {/* MAIN CONTENT */}
      <ContentContainer>
        {/* SCORE REGISTRATION */}
        <WodScoreWidget />

        {/* LATEST PR */}
        <StatCard
          route="#"
          title="Tu PR más reciente"
          additionalInfo={utils.getCurrentDate()}
        >
          <LatestPR title="Back Squat" value={205} units="lbs" />
        </StatCard>

        {/* CURRENT GOAL */}
        <StatCard
          route="#"
          title="Tu meta del mes"
          additionalInfo="En progreso..."
        >
          <MonthlyGoal description="Du's" status={60} />
        </StatCard>

        {/* ADD NEW PR */}
        <AddButton
          link={"#"}
          img={AthleteImg}
          alt="CrossFit Athlete Front Rack Position"
          title="Añadir Nuevo PR"
        />

        {/* ADD NEW GOAL */}
        <AddButton
          link={"#"}
          img={GymImg}
          alt="Bullet CrossFit Gym"
          title="Añadir Nueva Meta"
        />

        {/* BULLET GOAL */}
        <BulletGoalWidget />

        <h4 className="App__subtitle">Más para ti</h4>

        {/* PROFILE */}
        {/* {!error && !loading && ( */}
          <InfoCard
            link={"#"}
            img={HoodiesImg}
            alt="Athletes wearing Bullet CrossFit hoodies"
            title={"Sergio"}
            // title={user.data[info.firebase.docKeys.users.firstName]}
            additionalInfo="Ver perfil"
          />
        {/* )} */}
        {/* SETTINGS */}
        <InfoCard
          link={"#"}
          icon={UserIcon}
          alt="Setting icon"
          title={"Configuración"}
          additionalInfo="Cambiar ajustes"
        />
      </ContentContainer>
    </div>
  );
}

export { Home };
