import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecords } from "../../hooks/useRecords";
import { useMovements } from "../../hooks/useMovements";
import { useAuth } from "../../contexts/AuthContext";

// COMPONENTS
import { AddRecordForm } from "../../components/Athlete/AddRecord/AddRecordForm";
import { BackButton } from "../../components/Public/BackButton";
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { MovementRecordCard } from "../../components/Athlete/MovementRecordCard";
import { InputLoadingSkeleton } from "../../components/Layout/LoadingSkeletons/InputLoadingSkeleton";
import { StatWidget } from "../../components/Athlete/Widget/StatWidget";
import { TextLoadingSkeleton } from "../../components/Layout/LoadingSkeletons/TextLoadingSkeleton";
import { WidgetLoadingSkeleton } from "../../components/Layout/LoadingSkeletons/WidgetLoadingSkeleton";

// UTILS
import { info } from "../../utils/info";
import { utils } from "../../utils/utils";

// IMG
import AddIcon from "../../assets/icon/add-green.svg";

function MovementTracking() {
  const { user } = useAuth();
  const { records: record, actions, loading } = useRecords();
  const {
    movements,
    actions: actionsMovements,
    loading: loadingMovement,
  } = useMovements();

  const navigate = useNavigate();
  const params = useParams();

  const [oneRepMax, setOneRepMax] = useState([]);
  // const []
  const [setsRepMax, setSetsRepMax] = useState([]);
  const [weightPercents, setWeightPercents] = useState([]);
  const [isSkill, setIsSkill] = useState(false);
  const [addRecord, setAddRecord] = useState(false);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    // console.log("useEffect");
    if ((loading && !record && !movements) || refetch) {
      if (addRecord) setAddRecord(false);
      actions.getSingleRecord(
        user.uid || user.user_id,
        utils.getIdFromTitleUrl(params.id)
      );
    }

    if (record === -1 && !movements && loadingMovement) {
      // GET MOVEMENT IF RECORD DOES NOT EXIST
      return actionsMovements.getMovementById(
        utils.getIdFromTitleUrl(params.id)
      );
    }

    // SORT SCORES BY DATE AND GET ONE REP MAX (REPS = 1, SETS = 1)
    if (record && record !== -1 && !refetch && !addRecord) {
      if (
        record.movement_category.includes(
          info.firebase.values.movementCategories.skills
        )
      )
        setIsSkill(true);

      // SORT BY HEAVIST WEIGHT
      record.scores.sort((a, b) => b.weight - a.weight);
      // GET 1RM
      const oneRepMax = record.scores.filter(
        (score) => score.sets === 1 && score.reps === 1
      )[0];
      setOneRepMax(oneRepMax);

      // SORT BY LONGEST SETS AND REPS
      record.scores.sort((a, b) => b.sets * b.reps - a.sets * a.reps);
      // GET 5RM
      const setsRepMax = record.scores.filter(
        (score) => score.sets >= 1 && score.reps > 1
      )[0];
      setSetsRepMax(setsRepMax);

      // GET WEIGHT PERCENTS
      if (
        record.movement_category.includes(
          info.firebase.values.movementCategories.barbell
        )
      ) {
        const weightPercents = utils.getWeightPercents(oneRepMax.weight);
        setWeightPercents(weightPercents);
      }

      // SORT BY DATE TO GET HISTORY
      record.scores.sort((a, b) => b.date.seconds - a.date.seconds);
    }

    if (movements && movements !== -1) {
      // CHECK IF MOVEMENT IS A SKILL
      if (
        movements.movement_category.includes(
          info.firebase.values.movementCategories.skills
        )
      )
        setIsSkill(true);
    }

    setRefetch(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addRecord, record, movements, refetch]);

  // console.log("record", record);

  return (
    <div className="MovementTracking">
      <ContentContainer>
        <BackButton navigate={() => navigate(-1)} mb={true} />

        {/* LOADING STATE SKELETON */}
        {loading && (
          <section className="MovementTacking__content">
            <TextLoadingSkeleton />
            <TextLoadingSkeleton type="meta-tag" />
            <div className="StatWidget__container">
              <WidgetLoadingSkeleton type={"stat"} />
              <WidgetLoadingSkeleton type={"stat"} />
            </div>
            <TextLoadingSkeleton type="meta-tag" />
            <InputLoadingSkeleton />
            <TextLoadingSkeleton type="subtitle" />
            {new Array(5).fill(0).map((_, index) => (
              <InputLoadingSkeleton key={index} />
            ))}
          </section>
        )}

        {/* LOEADED HEADER */}
        {!loading && (
          <header className="Records__header">
            <h2 className="MovementTracking__title">
              {utils.getTitleFromTitleUrl(params.id)}
            </h2>
            {record && record !== -1 && (
              <button
                onClick={() => setAddRecord(!addRecord)}
                className={`Records__header__add-btn ${addRecord && "close"}`}
              >
                <img src={AddIcon} alt="Plus sign" />
              </button>
            )}
          </header>
        )}

        {/* LOADED STATE - NO RECORDS */}
        {((!loading && record === -1 && movements) ||
          (!loading && addRecord)) && (
          <AddRecordForm
            update={record !== -1 ? true : false}
            isSkill={isSkill}
            movementID={utils.getIdFromTitleUrl(params.id)}
            movementName={utils.getTitleFromTitleUrl(params.id)}
            movementCategories={
              record !== -1
                ? record.movement_category
                : movements?.movement_category
            }
            timescore={record !== -1 ? record?.timescore : movements?.timescore}
            setRefetch={setRefetch}
          />
        )}

        {/* LOADED STATE CONTENT */}
        {!loading && record && record !== -1 && (
          <section className="MovementTacking__content">
            <div className="StatWidget__container">
              {oneRepMax && oneRepMax.weight > 0 && !isSkill && (
                <StatWidget
                  title={"1 Rep Max"}
                  value={oneRepMax.weight}
                  units={oneRepMax.units}
                  seconds={oneRepMax.date.seconds}
                />
              )}
              {isSkill && (
                <StatWidget
                  metaDescription={""}
                  title={"Habilidad obtenida"}
                  seconds={record.scores[record.scores.length - 1].date.seconds}
                  checkIcon={true}
                />
              )}
              {setsRepMax && (
                <StatWidget
                  metaDescription={
                    setsRepMax.weight > 0
                      ? `Set más pesado (${setsRepMax.sets}x${setsRepMax.reps})`
                      : "Set más largo (Sets X Reps)"
                  }
                  value={
                    setsRepMax.weight > 0
                      ? setsRepMax.weight
                      : `${setsRepMax.sets}x${setsRepMax.reps}`
                  }
                  units={setsRepMax.weight > 0 && setsRepMax.units}
                  seconds={setsRepMax.date.seconds}
                />
              )}
            </div>

            <p className="app-meta-tag">Resultado más reciente</p>

            {record && (
              <MovementRecordCard
                dateInSeconds={record.scores[0].date.seconds}
                weight={record.scores[0].weight}
                seconds={record.scores[0].seconds}
                units={record.scores[0].units}
                reps={record.scores[0].reps}
                sets={record.scores[0].sets}
              />
            )}

            {weightPercents.length > 0 && (
              <h3 className="app-subtitle">
                Porcentajes <span className="app-meta-tag">(Basado en tu 1RM)</span>
              </h3>
            )}

            {weightPercents.length > 0 && (
              <section className="MovementTracking__percentage-table">
                {weightPercents.map((percent, index) => (
                  <article
                    className="MovementTracking__percentage-table__item"
                    key={index}
                  >
                    <p className="MovementTracking__percentage-table__item__value">
                      {percent}
                      <span> lbs</span>
                    </p>
                    <span className="MovementTracking__percentage-table__item__percent">
                      {info.data.weightPercents[index]}%
                    </span>
                  </article>
                ))}
              </section>
            )}

            {record?.scores.length > 1 && <p className="app-subtitle">Historial</p>}

            {record && (
              <div className="MovementTracking__records-container">
                {record.scores.slice(1).map((score, index) => {
                  return (
                    <MovementRecordCard
                      key={index}
                      dateInSeconds={score.date.seconds}
                      weight={score.weight}
                      seconds={score.seconds}
                      units={score.units}
                      reps={score.reps}
                      sets={score.sets}
                    />
                  );
                })}
              </div>
            )}
          </section>
        )}
      </ContentContainer>
    </div>
  );
}

export { MovementTracking };
