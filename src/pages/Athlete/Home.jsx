import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

// COMPONENTS
import { AddButton } from "../../components/Public/AddButton";
import { BirthdayCelebrationWidget } from "../../components/Public/BirthdayCelebrationWidget";
import { BulletGoalWidget } from "../../components/Athlete/BulletGoalWidget";
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { HomeBanner } from "../../components/Public/HomeBanner";
import { InfoCard } from "../../components/Public/InfoCard";
import { PersonalGoal } from "../../components/Athlete/PersonalGoal";
import { PRCard } from "../../components/Athlete/PRCard";
import { WodScoreWidget } from "../../components/Athlete/WodScoreWidget";

// UTILS
import { info } from "../../utils/info";

// IMG
import AthleteImg from "../../assets/img/athlete.jpg";
import Athlete2Img from "../../assets/img/athlete_2.jpg";
import HoodiesImg from "../../assets/img/sudaderas.jpg";
import UserIcon from "../../assets/icon/user.svg";

// TODO - Replace user name and user img with real one
// TODO - Add loading state

function Home() {
  const { user, loading, error } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (error) navigate("/server-error");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <div className="Home">
      <ContentContainer>
        {/* BIRTHDAT CELEBRATION */}
        {user && user.data && <BirthdayCelebrationWidget user={user} />}

        {/* HOME BANNER */}
        {loading && <HomeBanner user={""}></HomeBanner>}
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
        {/* SCORE REGISTRATION */}
        <WodScoreWidget />

        {/* LEADERBOARD */}
        <AddButton link={info.routes.leaderboard} title="Leaderboard" />

        {/* LATEST PR */}
        <h2 className="subtitle">Marcas personales</h2>
        <PRCard
          link={info.routes.recordHistory + `/${1}`}
          title="Back Squat"
          value={205}
          units="lbs"
          date={"18 Jun 2022"}
          latest={true}
        />

        {/* ADD NEW PR */}
        <AddButton
          link={info.routes.records}
          img={AthleteImg}
          alt="CrossFit Athlete Front Rack Position"
          title="Añadir Nuevo PR"
        />

        {/* ADD NEW GOAL */}
        <AddButton
          link={info.routes.records}
          img={Athlete2Img}
          alt="Bullet CrossFit shirt"
          title="Añadir Nueva Meta"
        />

        {/* CURRENT GOAL */}
        <h3 className="subtitle">Meta personal</h3>
        <PersonalGoal
          description="Du's"
          progress={60}
          status="En progreso"
          date={"20 Ene 2023"}
        />

        {/* BULLET GOAL */}
        <h3 className="subtitle">Reto del mes</h3>
        <BulletGoalWidget />

        <h4 className="subtitle">Más para ti</h4>
        {/* PROFILE */}
        {!error && !loading && (
          <InfoCard
            link={info.routes.profile}
            img={HoodiesImg}
            alt="Athletes wearing Bullet CrossFit hoodies"
            title={user.data[info.firebase.docKeys.users.firstName]}
            additionalInfo="Ver perfil"
          />
        )}
        {/* SETTINGS */}
        <InfoCard
          link={info.routes.settings}
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
