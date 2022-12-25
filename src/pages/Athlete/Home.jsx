import { useAuth } from "../../contexts/AuthContext";
import { info } from "../../utils/info";

// Components
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { HomeBanner } from "../../components/Public/HomeBanner";
import { WodScoreWidget } from "../../components/Athlete/WodScoreWidget";

function Home() {
  const { user, loading } = useAuth();

  // TODO - Add loading state
  return (
    <div className="Home">
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
      <ContentContainer>
        {/* SCORE REGISTRATION */}
        <WodScoreWidget />
        {/* LATEST PR */}
        {/* CURRENT GOAL */}
        {/* ADD NEW PR */}
        {/* ADD NEW GOAL */}

        {/* PROFILE */}
        {/* COMMUNITY GOAL */}
      </ContentContainer>
    </div>
  );
}

export { Home };
