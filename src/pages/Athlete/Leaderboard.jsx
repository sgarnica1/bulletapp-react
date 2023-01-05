import { useState, useEffect } from "react";
import { useWods } from "../../hooks/useWods";
import { useWodScores } from "../../hooks/useWodScores";

// COMPONENTS
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { DateWidget } from "../../components/Public/DateWidget";
import { SearchBar } from "../../components/Public/SearchBar";

// UTILS
import { info } from "../../utils/info";
import { utils } from "../../utils/utils";

function Leaderboard() {
  // TODO - Make searchbar work
  const { wods, actions: wodActions, loading: wodLoading } = useWods();
  const {
    wodScores,
    actions: wodScoresActions,
    loading: wodScoresLoading,
  } = useWodScores();

  const [weekDay, setWeekDay] = useState(new Date().getDay());
  const [wod, setWod] = useState(null);
  const [wodScoresSorted, setWodScoresSorted] = useState(null);
  const [refetch, setRefetch] = useState(false);
  const [filter, setFilter] = useState("");

  // METHODS
  const sortAscending = (wodScores) => {
    const sorted = wodScores.sort((a, b) => {
      return (
        a.score.minutes * 60 +
        a.score.seconds -
        (b.score.minutes * 60 + b.score.seconds)
      );
    });
    return sorted;
  };

  useEffect(() => {
    function getWodScoreList() {
      wods.forEach((wod) => {
        if (wod.locale_date.getDay() === weekDay) {
          setWod(wod);
          wodScoresActions.getWodScoresByWodId(wod.id);
        }
      });
    }

    setWod(null);
    if (!wods) wodActions.getWeeklyWods();
    if (wods) getWodScoreList();

    if (wodScores) sortAscending(wodScores);
  }, [wods, wod, weekDay, refetch]);

  return (
    <div className="Leaderboard">
      <ContentContainer sidePadding={false}>
        <div className="Leaderboard__container">
          <div className="Leaderboard__header">
            <h1 className="Leaderboard__title">Leaderboard</h1>
            <DateWidget date={utils.getCurrentDate()} />

            {/* DAY PICKER */}
            <div className="Leaderboard__day-picker">
              {info.data.weekDayNumberArray.map((day) => {
                if (day.num !== 0 && day.num !== 6)
                  return (
                    <button
                      key={day.num}
                      onClick={() => setWeekDay(day.num)}
                      className={`Leaderboard__day-button ${
                        weekDay === day.num ? "active" : ""
                      }`}
                    >
                      {day.ref}
                    </button>
                  );
              })}
            </div>

            {/* WOD LIST */}
            <div className="Leaderboard__wod">
              <div className="Leaderboard__wod__header">WOD</div>
              {!wod && (
                <p className="Leaderboard__wod__not-available">
                  {wodLoading ? "Cargando..." : "No disponible"}
                </p>
              )}
              {wod &&
                new Date(wod?.date.seconds * 1000).getDate() ===
                  new Date().getDate() && (
                  <p className="Leaderboard__wod__not-available">
                    No disponible
                  </p>
                )}
              {wod &&
                new Date(wod?.date.seconds * 1000).getDate() !==
                  new Date().getDate() && (
                  <div className="Leaderboard__wod__body">
                    <p className="Leaderboard__wod__title">
                      {wod.description.split(",")[0]}
                    </p>
                    {wod?.description
                      .split(",")
                      .slice(1)
                      .map((line, index) => (
                        <p
                          className="Leaderboard__wod__description"
                          key={index}
                        >
                          {line}
                        </p>
                      ))}
                    <p className="Leaderboard__wod__timecap">
                      Time Cap: <span>{wod.timecap} min</span>
                    </p>
                  </div>
                )}
            </div>
          </div>

          {/* LEADERBOARD LIST */}

          <div className="Leaderboard__body">
            {/* <div className="Leaderboard__body__filters">
              <select name="" id="">
              <option value="">Filtros</option>
              <option value="1">Menos a más</option>
              <option value="1">Más a menos</option>
              </select>
            </div> */}
            <SearchBar placeholder="Buscar atleta" />
            <div className="Leaderboard__body__tags">
              <span>#</span>
              <span>Atleta</span>
              <span>Score</span>
            </div>
            {/* LIST */}
            {wodScoresLoading && (
              <div className="Leaderboard__body__score">Cargando...</div>
            )}
            {!wodScoresLoading &&
              wodScores &&
              sortAscending(wodScores).map((score, index) => (
                <div className="Leaderboard__body__score" key={index}>
                  <span className="Leaderboard__body__score-position">
                    {index + 1}
                  </span>
                  <p className="Leaderboard__body__score-name">
                    {score.user.first_name} {score.user.last_name}
                  </p>
                  <span className="Leaderboard__body__score-value">
                    {score.score.minutes < 10
                      ? `0${score.score.minutes}`
                      : `${score.score.minutes}`}
                    :
                    {score.score.seconds < 10
                      ? `0${score.score.seconds}`
                      : `${score.score.seconds}`}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </ContentContainer>
    </div>
  );
}

export { Leaderboard };
