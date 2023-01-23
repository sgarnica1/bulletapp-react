import { useEffect } from "react";
import { useDashboard } from "../../contexts/DashboardContext";
import { info } from "../../utils/info";
// COMPONENTS
import { AddWodForm } from "../../components/Admin/AddWodForm";
import { Banner } from "../../components/Public/Banner";
import { ContentContainer } from "../../components/Layout/ContentContainer";

const AddWod = () => {
  const { setActiveView } = useDashboard();
  useEffect(() => {
    setActiveView(info.views.addWod);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="AddWod">
      <ContentContainer>
        <Banner title={"Añadir nuevo WOD"} description={""} />
        <AddWodForm />
      </ContentContainer>
    </div>
  );
};

export { AddWod };
