import { info } from "../../utils/info";

// COMPONENTS
import { UpdatePersonalRecordForm } from "../../components/Athlete/AddRecord/UpdatePersonalRecordForm";
import { BackButton } from "../../components/Public/BackButton";
import { ContentContainer } from "../../components/Layout/ContentContainer";

const UpdatePersonalRecord = ({
  prID,
  movementName,
  prScoreType,
  backButtonLink,
  setUpdate,
}) => {
  return (
    <div className="UpdatePersonalRecord">
      <ContentContainer>
        <BackButton
          link={backButtonLink}
          mb={true}
          onClickCallback={() => setUpdate(false)}
        />
        <UpdatePersonalRecordForm
          prID={prID}
          movementName={movementName}
          prScoreType={prScoreType}
        />
      </ContentContainer>
    </div>
  );
};

export { UpdatePersonalRecord };
