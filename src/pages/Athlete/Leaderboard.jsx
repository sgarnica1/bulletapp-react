import { useState, useEffect } from "react";
import { useWodScores } from "../../hooks/useWodScores";
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

  const [weekDay, setWeekDay] = useState(new Date().getDay());
  const [wodAvailable, setWodAvailable] = useState(false);
  const [sortedWodScores, setSortedWodScores] = useState();
  const [refetch, setRefetch] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());

  // METHODS
  const sortAscending = (wods) => {
    const sorted = wods.sort((a, b) => {
      return (
        a.score.minutes * 60 +
        a.score.seconds -
        (b.score.minutes * 60 + b.score.seconds)
      );
    });
    sorted.map((score, index) => (score.position = index + 1));
    setSortedWodScores(sorted);
  };

  const setWodDate = (weekDay) => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : weekDay);
    return new Date(today.setDate(diff));
  };

  useEffect(() => {
    if (loading) setSearchValue("");
    const date = setWodDate(weekDay);
    setCurrentDate(date);

    // FETCH DATA
    if (refetch) actions.getWodByDateWithScores(date);

    // CHECK IF WOD IS AVAILABLE
    if (weekDay >= new Date().getDay()) setWodAvailable(false);
    else setWodAvailable(true);
    setRefetch(false);

    if (wods && wods.scores) sortAscending(wods.scores);

    if (!loading && wods) {
      const filteredUsers = utils.searchDataFromInput(wods.scores, searchValue, "username");
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
            {!loading && !wodAvailable && (
              <p className="Leaderboard__wod__not-available">No disponible</p>
            )}

            {!loading && wodAvailable && wods && (
              <div className="Leaderboard__wod__body">
                <p className="Leaderboard__wod__title">
                  {wods.description.split(",")[0]}
                </p>
                {wods?.description
                  .split(",")
                  .slice(1)
                  .map((line, index) => (
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
            <h2 className="subtitle">Leaderboard</h2>
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
            {sortedWodScores && sortedWodScores.length === 0 && (
              <div className="Leaderboard__body__empty">No hay resultados</div>
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
                    {score.username}
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
