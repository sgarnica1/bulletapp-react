import { useState, useEffect } from "react";
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
  const { wodScores, actions, loading } = useWodScores();

  const [weekDay, setWeekDay] = useState(new Date().getDay());
  const [wodAvailable, setWodAvailable] = useState(false);
  const [sortedWodScores, setSortedWodScores] = useState();
  const [refetch, setRefetch] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  // METHODS
  const sortAscending = (wodScores) => {
    const sorted = wodScores.sort((a, b) => {
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
    console.log("WOD SCORES");
    const date = setWodDate(weekDay);

    if (refetch) actions.getWodWithWodScoresByDate(date);
    if (weekDay >= new Date().getDay()) setWodAvailable(false);
    else setWodAvailable(true);
    setRefetch(false);

    if (wodScores) sortAscending(wodScores.wodScores);

    if (!loading && wodScores) {
      const filteredUsers = utils.searchDataFromInput(
        wodScores.wodScores,
        searchValue
      );
      setSortedWodScores(filteredUsers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekDay, wodScores, loading, searchValue]);

  return (
    <div className="Leaderboard">
      <ContentContainer sidePadding={true}>
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
            <div className="Leaderboard__wod">
              <div className="Leaderboard__wod__header">WOD</div>
              {loading && !wodScores && (
                <p className="Leaderboard__wod__not-available">Cargando...</p>
              )}
              {!loading && !wodAvailable && (
                <p className="Leaderboard__wod__not-available">No disponible</p>
              )}

              {!loading && wodAvailable && wodScores && (
                <div className="Leaderboard__wod__body">
                  <p className="Leaderboard__wod__title">
                    {wodScores?.wod?.description.split(",")[0]}
                  </p>
                  {wodScores?.wod?.description
                    .split(",")
                    .slice(1)
                    .map((line, index) => (
                      <p className="Leaderboard__wod__description" key={index}>
                        {line}
                      </p>
                    ))}
                  <p className="Leaderboard__wod__timecap">
                    Time Cap: <span>{wodScores?.wod?.timecap} min</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* LEADERBOARD LIST */}

          <div className="Leaderboard__body">
            <SearchBar
              placeholder="Buscar atleta"
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              loading={loading}
            />
            {/* <div className="Leaderboard__body__tags">
              <span>#</span>
              <span>Atleta</span>
              <span>Score</span>
            </div> */}

            {loading && (
              <div className="Leaderboard__body__score">Cargando...</div>
            )}
            {!loading &&
              wodScores &&
              wodScores.wodScores &&
              sortedWodScores.map((score, index) => (
                <div className="Leaderboard__body__score" key={index}>
                  <span className="Leaderboard__body__score-position">
                    {score.position}
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
