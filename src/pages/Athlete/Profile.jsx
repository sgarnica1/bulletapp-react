import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useDashboard } from "../../contexts/DashboardContext";

import { info } from "../../utils/info";

// COMPONENTS
import { BackButton } from "../../components/Public/BackButton";
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { InfoCard } from "../../components/Public/InfoCard";

// TODO - Replace user name, user img and user email with real one

function Profile() {
  const { user, loading, error } = useAuth();
  const { setActiveView } = useDashboard();

  useEffect(() => {
    setActiveView(info.views.profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Profile">
      <ContentContainer>
        <BackButton link={info.routes.home} mb={true} />
        <h1 className="title margin">Perfil</h1>
        {!error && !loading && (
          <InfoCard
            title={`${user.data[info.firebase.docKeys.users.firstName]} ${
              user.data[info.firebase.docKeys.users.lastName]
            }`}
            additionalInfo={user.data[info.firebase.docKeys.users.email]}
          />
        )}
      </ContentContainer>
    </div>
  );
}

export { Profile };
