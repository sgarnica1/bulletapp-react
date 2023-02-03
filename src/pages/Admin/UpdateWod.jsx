import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDashboard } from "../../contexts/DashboardContext";
import { useWods } from "../../hooks/useWods";
import { info } from "../../utils/info";
// COMPONENTS
import { AddWodForm } from "../../components/Admin/AddWodForm";
import { BackButton } from "../../components/Public/BackButton";
import { Banner } from "../../components/Public/Banner";
import { ContentContainer } from "../../components/Layout/ContentContainer";

const UpdateWod = () => {
  const { setActiveView } = useDashboard();
  const { id } = useParams();
  const { wods: wod, actions, loading, error } = useWods();

  useEffect(() => {
    setActiveView(info.views.addWod);
    if (!wod) actions.getWodById(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="AddWod">
      <ContentContainer>
        <BackButton link={info.routes.programming.nested.wods.path} mb={true} />
        <Banner title={"Editar WOD"} description={""} />
        {!loading && !error && wod && (
          <AddWodForm
            id={wod.id}
            title={wod.title}
            description={wod.description}
            rounds={wod.rounds}
            reps={wod.reps}
            timecap={wod.timecap}
            date={wod.date}
            category={wod.category}
            timescore={wod.timescore}
          />
        )}
      </ContentContainer>
    </div>
  );
};

export { UpdateWod };
