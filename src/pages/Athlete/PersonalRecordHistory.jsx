import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePRs } from "../../hooks/usePRs";
import { useAuth } from "../../contexts/AuthContext";

// COMPONENTS
import { BackButton } from "../../components/Public/BackButton";
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { InputLoadingSkeleton } from "../../components/Layout/LoadingSkeletons/InputLoadingSkeleton";
import { TextLoadingSkeleton } from "../../components/Layout/LoadingSkeletons/TextLoadingSkeleton";
import { UpdatePersonalRecord } from "./UpdatePersonalRecord";

// UTILS
import { info } from "../../utils/info";
import { utils } from "../../utils/utils";

// IMG
import AddIcon from "../../assets/icon/add-green.svg";

function PersonalRecordHistory() {
  const { user } = useAuth();
  const { prs: pr, actions, loading, error } = usePRs();

  const navigate = useNavigate();
  const params = useParams();
  const timeScoreType = info.firebase.values.scoreTypes.time.name;
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const isUpdate = window.location.pathname.match(new RegExp(/actualizar/));
    isUpdate ? setUpdate(true) : setUpdate(false);

    if (!loading && !pr)
      actions.getSinglePR(
        user.uid || user.user_id,
        utils.getIdFromTitleUrl(params.id)
      );

    if (pr === -1) return navigate(info.routes.notFound);

    if (pr) return pr.scores.sort((a, b) => b.date.seconds - a.date.seconds);
  }, [update, pr]);

  if (pr) {
    console.log(pr);
  }

  return (
    <div className="PersonalRecordHistory">
      {!update && (
        <ContentContainer>
          <BackButton link={info.routes.prs.path} mb={true} />
          {loading && <TextLoadingSkeleton />}

          {!loading && (
            <header className="Records__header">
              <h2 className="PersonalRecordHistory__title">{pr?.movement}</h2>
              <button
                onClick={() => {
                  setUpdate(true);
                  navigate("actualizar");
                }}
                className="Records__header__add-btn"
              >
                <img src={AddIcon} alt="Plus sign" />
              </button>
            </header>
          )}

          {loading && <TextLoadingSkeleton type="meta-tag" />}

          {!loading && (
            <section className="PersonalRecordHistory__meta-info">
              <p className="PersonalRecordHistory__meta-info--item">
              <span className="PersonalRecordHistory__meta-info--tag">Categoría: </span>
                {pr?.movement_category || ""}
              </p>
            </section>
          )}

          {loading ? (
            <TextLoadingSkeleton type="meta-tag" />
          ) : (
            <p className="meta-tag">PR más reciente</p>
          )}

          {loading && <InputLoadingSkeleton />}

          {!loading && pr && (
            <div className="PersonalRecordHistory__pr">
              {pr.score_type === timeScoreType && (
                <p className="PersonalRecordHistory__pr__value">
                  {utils.secondsToTime(pr.scores[0].value)}
                </p>
              )}
              {pr.score_type !== timeScoreType && (
                <p className="PersonalRecordHistory__pr__value">
                  {pr.scores[0].value} {pr.units}
                </p>
              )}
              <p className="PersonalRecordHistory__pr__date">
                {utils.secondsToDate(pr.scores[0].date.seconds)}
              </p>
            </div>
          )}

          {loading && <TextLoadingSkeleton type="subtitle" />}

          {!loading && pr?.scores.length > 1 && (
            <p className="subtitle">Historial de PRs</p>
          )}

          {loading &&
            new Array(5)
              .fill(0)
              .map((_, index) => <InputLoadingSkeleton key={index} />)}
          {!loading && pr && (
            <section className="PersonalRecordHistory__prs-container">
              {pr.scores.slice(1).map((score, index) => {
                return (
                  <div className="PersonalRecordHistory__pr" key={index}>
                    {pr.score_type === timeScoreType && (
                      <p className="PersonalRecordHistory__pr__value">
                        {utils.secondsToTime(score.value)}
                      </p>
                    )}
                    {pr.score_type !== timeScoreType && (
                      <p className="PersonalRecordHistory__pr__value">
                        {score.value} {pr.units}
                      </p>
                    )}

                    <p className="PersonalRecordHistory__pr__date">
                      {utils.secondsToDate(score.date.seconds)}
                    </p>
                  </div>
                );
              })}
            </section>
          )}
        </ContentContainer>
      )}

      <Routes>
        <Route
          path={info.routes.prs.nested.update.path}
          element={
            <UpdatePersonalRecord
              prID={utils.getIdFromTitleUrl(params.id)}
              movementName={pr?.movement}
              prScoreType={pr?.score_type}
              setUpdate={setUpdate}
              backButtonLink={
                info.routes.prs.nested.history.absolutePathNoParms +
                `/${params.id}`
              }
            />
          }
        />
      </Routes>
    </div>
  );
}

export { PersonalRecordHistory };
