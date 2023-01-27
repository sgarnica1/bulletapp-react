import { useState, useEffect } from "react";
import { useDashboard } from "../../contexts/DashboardContext";
import { useWods } from "../../hooks/useWods";

// COMPONENTS
import { BackButton } from "../../components/Public/BackButton";
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { DateWidget } from "../../components/Public/DateWidget";
import { SearchBar } from "../../components/Public/SearchBar";
import { InputLoadingSkeleton } from "../../components/Layout/LoadingSkeletons/InputLoadingSkeleton";
import { WidgetLoadingSkeleton } from "../../components/Layout/LoadingSkeletons/WidgetLoadingSkeleton";

// UTILS
import { info } from "../../utils/info";
import { utils } from "../../utils/utils";

function Leaderboard() {
  const { wods, actions, loading } = useWods();
  const { setActiveView } = useDashboard();

  const [weekDay, setWeekDay] = useState(
    new Date().getDay() === 0 || new Date().getDay() === 6
      ? 5
      : new Date().getDay()
  );
  const [wodAvailable, setWodAvailable] = useState(false);
  const [sortedWodScores, setSortedWodScores] = useState();
  const [refetch, setRefetch] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setActiveView(info.views.leaderboard);
    if (loading) setSearchValue("");

    const date = setWodDate(weekDay);
    setCurrentDate(date);

    // FETCH DATA
    if (refetch) actions.getWodByDateWithScores(date);

    // CHECK IF WOD IS AVAILABLE
    if (new Date().getDay() !== 6 && new Date().getDay() !== 0)
      setWodAvailable(false);
    if (weekDay >= new Date().getDay()) setWodAvailable(false);
    else setWodAvailable(true);

    setRefetch(false);

    let sorted = [];
    if (wods && wods.scores) {
      sorted = sortAscending(wods.scores);
    }
    setSortedWodScores(sorted);

    if (!loading && wods) {
      const filteredUsers = utils.searchDataFromInput(
        sorted,
        searchValue,
        wods.teams ? "score" : "username",
        wods.teams ? "teamMembers" : null
      );
      setSortedWodScores(filteredUsers);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekDay, wods, loading, searchValue]);

  return (
    <div className="Leaderboard">
      <ContentContainer sidePadding={true}>
        <BackButton link={info.routes.home} mb={true} />
        <div className="Leaderboard__container">
          <div className="Leaderboard__header">
            <h1 className="Leaderboard__title">WOD</h1>
            {loading && WidgetLoadingSkeleton({ type: "date" })}
            {!loading && (
              <DateWidget date={utils.formatDateLong(currentDate)} />
            )}
          </div>

          {/* DAY PICKER */}
          <div className="Leaderboard__day-picker">
            {info.data.weekDayNumberArray.map((day) => {
              if (day.num !== 0 && day.num !== 6)
                return (
                  <button
                    key={day.num}
                    onClick={() => {
                      setWeekDay(day.num);
                      setRefetch(true);
                    }}
                    className={`Leaderboard__day-button ${
                      weekDay === day.num ? "active" : ""
                    }`}
                  >
                    {day.ref}
                  </button>
                );
              return null;
            })}
          </div>

          {/* WOD LIST */}
          {loading && !wods && <WidgetLoadingSkeleton wod={true} />}
          <div className="Leaderboard__wod">
            {!loading && (!wodAvailable || !wods) && (
              <p className="Leaderboard__wod__not-available">No disponible</p>
            )}

            {!loading && wodAvailable && wods && (
              <div className="Leaderboard__wod__body">
                <p className="Leaderboard__wod__title">{wods.title}</p>
                {wods?.description.split("\n").map((line, index) => (
                  <p className="Leaderboard__wod__description" key={index}>
                    {line}
                  </p>
                ))}
                <p className="Leaderboard__wod__timecap">
                  Time Cap: <span>{wods?.timecap} min</span>
                </p>
              </div>
            )}
          </div>

          {/* LEADERBOARD LIST */}
          <div className="Leaderboard__body">
            <h2 className="app-subtitle">Leaderboard</h2>
            {loading && (
              <>
                <InputLoadingSkeleton type="searchBar" />
                {new Array(10).fill(0).map((_, index) => (
                  <InputLoadingSkeleton key={index} />
                ))}
              </>
            )}

            {!loading && (
              <SearchBar
                placeholder="Buscar atleta"
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                loading={loading}
              />
            )}
            {(!wods?.scores || wods?.scores?.length === 0) && (
              <div className="Leaderboard__body__empty">
                Aún no hay resultados
              </div>
            )}
            {wods?.scores?.length > 0 &&
              sortedWodScores &&
              sortedWodScores.length === 0 && (
                <div className="Leaderboard__body__empty">
                  No hay resultados para "{searchValue}"
                </div>
              )}

            {!loading &&
              wods &&
              wods.scores &&
              sortedWodScores.map((score, index) => (
                <div className="Leaderboard__body__score" key={index}>
                  <span className="Leaderboard__body__score-position">
                    {score.position}
                  </span>
                  <p className="Leaderboard__body__score-name">
                    {wods.teams ? score.score.teamMembers : score.username}
                  </p>
                  {!score.score.timeCaped && (
                    <span className="Leaderboard__body__score-value">
                      {score.score.minutes < 10
                        ? `0${score.score.minutes}`
                        : `${score.score.minutes}`}
                      :
                      {score.score.seconds < 10
                        ? `0${score.score.seconds}`
                        : `${score.score.seconds}`}
                      {wods.weightscore && (
                        <span className="Leaderboard__body__score-value--weight">
                          {score.score.weight
                            ? ` - ${score.score.weight} lbs `
                            : ` - 0 lbs`}
                        </span>
                      )}
                    </span>
                  )}
                  {score.score.timeCaped && (
                    <span className="Leaderboard__body__score-value">
                      +{score.score.missingReps} reps
                      {wods.weightscore && (
                        <span className="Leaderboard__body__score-value--weight">
                          {score.score.weight
                            ? ` - ${score.score.weight} lbs `
                            : ` - 0 lbs`}
                        </span>
                      )}
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      </ContentContainer>
    </div>
  );

  // METHODS
  function sortAscending(wods) {
    const onTimeScores = wods.filter((score) => !score.score.timeCaped);
    const timeCapedScores = wods.filter((score) => score.score.timeCaped);

    const onTimeSorted = onTimeScores.sort((a, b) => {
      return (
        a.score.minutes * 60 +
        a.score.seconds -
        (b.score.minutes * 60 + b.score.seconds)
      );
    });

    const timeCapedSorted = timeCapedScores.sort((a, b) => {
      return a.score.missingReps - b.score.missingReps;
    });

    const sorted = [...onTimeSorted, ...timeCapedSorted];

    sorted.map((score, index) => (score.position = index + 1));
    return sorted;
  }

  function setWodDate(weekDay) {
    const today = new Date();
    const day = today.getDay(); // Weekday as a number (0-6)
    const diff = today.getDate() + (weekDay - day);
    return new Date(today.setDate(diff));
  }
}

export { Leaderboard };
