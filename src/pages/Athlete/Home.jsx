import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { usePRs } from "../../hooks/usePRs";

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
import { WidgetLoadingSkeleton } from "../../components/Layout/LoadingSkeletons/WidgetLoadingSkeleton";

// UTILS
import { info } from "../../utils/info";
import { utils } from "../../utils/utils";

// IMG
import AthleteImg from "../../assets/img/athlete.jpg";
import Athlete2Img from "../../assets/img/athlete_2.jpg";
import HoodiesImg from "../../assets/img/sudaderas.jpg";
import UserIcon from "../../assets/icon/user.svg";

function Home() {
  const { user, loading, error } = useAuth();
  const { prs, actions, loading: loadingPR, error: errorPR } = usePRs();

  const [latestPR, setLatestPR] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) navigate(info.routes.serverError.path);
    if (!prs) actions.getPRs(user.uid || user.user_id);

    if (prs && !latestPR) {
      prs.forEach((pr) =>
        pr.scores.sort((a, b) => b.date.seconds - a.date.seconds)
      );

      const sorted = prs.sort(
        (a, b) => b.scores[0].date.seconds - a.scores[0].date.seconds
      );
      console.log(sorted[0]);
      setLatestPR(sorted[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, prs]);

  // console.log(latesPR);

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
        <h2 className="subtitle">Marcas personales</h2>
        {loadingPR && <WidgetLoadingSkeleton />}
        {!loadingPR && latestPR && (
          <PRCard
            link={
              info.routes.prs.nested.history.absolutePathNoParms +
              `/${utils.formatTitleToUrl(latestPR.movement)}-${latestPR.id}`
            }
            title={latestPR.movement}
            value={latestPR.scores[0].value}
            units={latestPR.units}
            seconds={latestPR.scores[0].date.seconds}
            // latest={true}
          />
        )}

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
            link={info.routes.profile.path}
            img={HoodiesImg}
            alt="Athletes wearing Bullet CrossFit hoodies"
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
