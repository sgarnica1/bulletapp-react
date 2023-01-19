import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRecords } from "../../hooks/useRecords";
import { useSkills } from "../../hooks/useSkills";

// COMPONENTS
import { AddButton } from "../../components/Public/AddButton";
import { BirthdayCelebrationWidget } from "../../components/Public/BirthdayCelebrationWidget";
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { HomeBanner } from "../../components/Public/HomeBanner";
import { InfoCard } from "../../components/Public/InfoCard";
import { StatWidget } from "../../components/Athlete/Widget/StatWidget";
import { WodScoreWidget } from "../../components/Athlete/Widget/WodScoreWidget";
import { TextLoadingSkeleton } from "../../components/Layout/LoadingSkeletons/TextLoadingSkeleton";
import { WidgetLoadingSkeleton } from "../../components/Layout/LoadingSkeletons/WidgetLoadingSkeleton";

// UTILS
import { info } from "../../utils/info";
import { utils } from "../../utils/utils";

// IMG
import AthleteImg from "../../assets/img/athlete.jpg";
import Athlete2Img from "../../assets/img/athlete_2.jpg";
import UserIcon from "../../assets/icon/user.svg";

function Home() {
  const { user, loading, error } = useAuth();
  const {
    records: repMax,
    actions: actionsRecord,
    loading: loadingRecord,
    error: errorRecord,
  } = useRecords();
  const {
    skills,
    actions: actionsSkills,
    loading: loadingSkills,
    error: errorSkills,
  } = useSkills();

  const [latestSkill, setLatestSkill] = useState(false);
  const [refetchRecords, setRefetchRecords] = useState(true);
  const [refetchSkills, setRefetchSkills] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // REDIRECT TO ERROR PAGE IF ERROR
    if (error) navigate(info.routes.serverError.path);

    // FETCH RECORDS AND SKILLS
    if (refetchRecords && loadingRecord && !repMax) {
      setRefetchRecords(false);
      actionsRecord.getLastRepMax(user.uid || user.user_id);
    }

    if (refetchSkills && repMax && loadingSkills && !skills) {
      setRefetchSkills(false);
      actionsSkills.getSkillsByUserId(user.uid || user.user_id);
    }

    if (skills && !latestSkill) {
      const sorted = skills.sort((a, b) => b.date.seconds - a.date.seconds);
      setLatestSkill(sorted[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, repMax, skills]);

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
        <AddButton link={info.routes.leaderboard.path} title="Leaderboard" />

        {/* LATEST Record */}
        {(loadingRecord || loadingSkills) && <TextLoadingSkeleton />}

        {(repMax || skills) && <h2 className="subtitle">Marcas personales</h2>}
        {loadingRecord && (
          <div className="StatWidget__container">
            <WidgetLoadingSkeleton type={"stat"} />
            <WidgetLoadingSkeleton type={"stat"} />
          </div>
        )}

        {!loadingRecord && !loadingSkills && latestSkill && (
          <div className="StatWidget__container">
            <StatWidget
              metaDescription={"1RM más reciente"}
              title={`${repMax.movement}`}
              value={repMax.weight}
              units={repMax.units}
              seconds={repMax.date.seconds}
              timescore={repMax.timescore}
            />
            <StatWidget
              metaDescription={"Skill más reciente"}
              title={latestSkill.movement}
              seconds={latestSkill.date.seconds}
            />
          </div>
        )}

        <h3 className="subtitle">Añade un nuevo logro</h3>
        {/* ADD NEW Record */}
        <AddButton
          link={info.routes.movements.path}
          img={AthleteImg}
          alt="CrossFit Athlete Front Rack Position"
          title="Añadir Nuevo Record"
        />

        {/* ADD NEW GOAL */}
        <AddButton
          link={info.routes.skills.path}
          img={Athlete2Img}
          alt="Bullet CrossFit shirt"
          title="Desbloquear Habilidad"
        />

        <h4 className="subtitle">Más para ti</h4>
        {/* PROFILE */}
        {!error && !loading && (
          <InfoCard
            link={info.routes.profile.path}
            title={user.data[info.firebase.docKeys.users.firstName]}
            additionalInfo="Ver perfil"
          />
        )}
        {/* SETTINGS */}
        <InfoCard
          link={info.routes.settings.path}
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
