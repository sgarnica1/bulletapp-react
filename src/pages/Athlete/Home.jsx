import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRecords } from "../../hooks/useRecords";
import { useDashboard } from "../../contexts/DashboardContext";

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

// IMG
import AthleteImg from "../../assets/img/athlete.jpg";
import Athlete2Img from "../../assets/img/athlete_2.jpg";
import UserIcon from "../../assets/icon/user.svg";

function Home() {
  const navigate = useNavigate();
  const { setActiveView } = useDashboard();
  const { user, loading, error } = useAuth();
  const {
    records: latestactivity,
    actions: actionsRecord,
    loading: loadingRecord,
  } = useRecords();

  const [refetchRecords, setRefetchRecords] = useState(true);

  useEffect(() => {
    setActiveView(info.views.home);

    // REDIRECT TO ERROR PAGE IF ERROR
    if (error) navigate(info.routes.serverError.path);

    // FETCH RECORDS AND SKILLS
    if (refetchRecords && loadingRecord && !latestactivity) {
      setRefetchRecords(false);
      actionsRecord.getLatestActitvity(user.uid || user.user_id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, latestactivity]);

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

        {/* LOADING */}
        {loadingRecord && <TextLoadingSkeleton />}
        {loadingRecord && (
          <div className="StatWidget__container">
            <WidgetLoadingSkeleton type={"stat"} />
            <WidgetLoadingSkeleton type={"stat"} />
            <WidgetLoadingSkeleton type={"stat"} />
            <WidgetLoadingSkeleton type={"stat"} />
          </div>
        )}

        {/* LATEST RECORDS */}
        {latestactivity && <h2 className="subtitle">Marcas personales</h2>}
        {!loadingRecord && latestactivity && (
          <div className="StatWidget__container grid">
            {/* Last register */}
            {latestactivity.register && (
              <StatWidget
                metaDescription={"Última actividad"}
                title={`${latestactivity.register.movement} ${
                  !latestactivity.register.timescore
                    ? "(" +
                      latestactivity.register.scores[0].sets +
                      "x" +
                      latestactivity.register.scores[0].reps +
                      ")"
                    : ""
                }`}
                seconds={latestactivity.register.scores[0].date.seconds}
                value={
                  latestactivity.register.scores[0].weight > 0
                    ? latestactivity.register.scores[0].weight
                    : latestactivity.register.scores[0].seconds
                }
                units={
                  latestactivity.register.scores[0].weight > 0
                    ? latestactivity.register.scores[0].units
                    : ""
                }
                timescore={latestactivity.register.timescore}
              />
            )}
            {/* Rep max */}
            {latestactivity.repmax && (
              <StatWidget
                metaDescription={"1RM más reciente"}
                title={`${latestactivity.repmax.movement}`}
                value={latestactivity.repmax.weight}
                units={latestactivity.repmax.units}
                seconds={latestactivity.repmax.date.seconds}
                timescore={latestactivity.repmax.timescore}
              />
            )}

            {latestactivity.skill && (
              <StatWidget
                metaDescription={"Skill más reciente"}
                title={latestactivity.skill.movement}
                seconds={latestactivity.skill.date.seconds}
              />
            )}
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
