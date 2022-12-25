import { useAuth } from "../../contexts/AuthContext";
import { info } from "../../utils/info";

// Components
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { HomeBanner } from "../../components/Public/HomeBanner";
import { WodScoreWidget } from "../../components/Athlete/WodScoreWidget";
import { StatCard } from "../../components/Public/StatCard";
import { LatestPR } from "../../components/Athlete/LatestPR";
import { MonthlyGoal } from "../../components/Athlete/MonthlyGoal";

function Home() {
  const { user, loading } = useAuth();

  // TODO - Add loading state
  return (
    <div className="Home">
      {/* HOME BANNER */}
      {loading && <HomeBanner user={"Loading..."}></HomeBanner>}
      {!loading && (
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
          additionalInfo={new Date().toDateString()}
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
        {/* ADD NEW GOAL */}

        {/* PROFILE */}
        {/* COMMUNITY GOAL */}
      </ContentContainer>
    </div>
  );
}

export { Home };
