import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { usePRs } from "../../hooks/usePRs";
import { useSkills } from "../../hooks/useSkills";

// COMPONENTS
import { AddButton } from "../../components/Public/AddButton";
import { BirthdayCelebrationWidget } from "../../components/Public/BirthdayCelebrationWidget";
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { HomeBanner } from "../../components/Public/HomeBanner";
import { InfoCard } from "../../components/Public/InfoCard";
import { PersonalGoal } from "../../components/Athlete/PersonalGoal";
import { StatWidget } from "../../components/Athlete/Widget/StatWidget";
import { WodScoreWidget } from "../../components/Athlete/WodScoreWidget";
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
    prs,
    actions: actionsPR,
    loading: loadingPR,
    error: errorPR,
  } = usePRs();
  const {
    skills,
    actions: actionsSkills,
    loading: loadingSkills,
    error: errorSkills,
  } = useSkills();

  const [latestPR, setLatestPR] = useState(false);
  const [latestSkill, setLatestSkill] = useState(false);
  const [refetchPRs, setRefetchPRs] = useState(true);
  const [refetchSkills, setRefetchSkills] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) navigate(info.routes.serverError.path);

    if (refetchPRs && loadingPR && !prs) {
      setRefetchPRs(false);
      actionsPR.getPRs(user.uid || user.user_id);
    }
    if (refetchSkills && prs && loadingSkills && !skills) {
      setRefetchSkills(false);
      actionsSkills.getSkills(user.uid || user.user_id);
    }

    if (prs && !latestPR) {
      prs.forEach((pr) =>
        pr.scores.sort((a, b) => b.date.seconds - a.date.seconds)
      );

      const sorted = prs.sort(
        (a, b) => b.scores[0].date.seconds - a.scores[0].date.seconds
      );
      setLatestPR(sorted[0]);
    }
    if (skills && !latestSkill) {
      const sorted = skills.sort((a, b) => b.date.seconds - a.date.seconds);
      setLatestSkill(sorted[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, prs, skills]);

  // console.log("skills", skills);

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

        {/* LATEST PR */}
        {(loadingPR || loadingSkills) && <TextLoadingSkeleton />}
        {(!prs || !skills) && (
          <h2 className="subtitle">Marcas personales</h2>
        )}
        {loadingPR && (
          <div className="StatWidget__container">
            <WidgetLoadingSkeleton type={"stat"} />
            <WidgetLoadingSkeleton type={"stat"} />
          </div>
        )}

        {!loadingPR && latestPR && !loadingSkills && latestSkill && (
          <div className="StatWidget__container">
            <StatWidget
              metaDescription={"PR más reciente"}
              title={latestPR.movement}
              value={latestPR.scores[0].value}
              units={latestPR.units}
              seconds={latestPR.scores[0].date.seconds}
              scoreType={latestPR.score_type}
            />
            <StatWidget
              metaDescription={"Skill más reciente"}
              title={latestSkill.movement}
              seconds={latestSkill.date.seconds}
            />
          </div>
        )}

        <h3 className="subtitle">Añade un nuevo logro</h3>
        {/* ADD NEW PR */}
        <AddButton
          link={info.routes.prs.nested.add.absolutePath}
          img={AthleteImg}
          alt="CrossFit Athlete Front Rack Position"
          title="Añadir Nuevo PR"
        />

        {/* ADD NEW GOAL */}
        <AddButton
          link={info.routes.skills.nested.add.absolutePath}
          img={Athlete2Img}
          alt="Bullet CrossFit shirt"
          title="Añadir Nueva Habilidad"
        />

        {/* CURRENT GOAL */}
        {/* <h3 className="subtitle">Meta personal</h3>
        <PersonalGoal
          description="Du's"
          progress={60}
          status="En progreso"
          date={"20 Ene 2023"}
        /> */}

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
