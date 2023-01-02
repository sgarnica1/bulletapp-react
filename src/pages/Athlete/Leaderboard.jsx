import { useState, useEffect } from "react";
import { useWods } from "../../hooks/useWods";

// COMPONENTS
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { DateWidget } from "../../components/Public/DateWidget";
import { SearchBar } from "../../components/Public/SearchBar";

// UTILS
import { info } from "../../utils/info";
import { utils } from "../../utils/utils";

function Leaderboard() {
  // TODO - Make searchbar work
  const { wods: wods2, actions: wodActions } = useWods();

  const [weekDay, setWeekDay] = useState(new Date().getDay());
  const [wod, setWod] = useState(null);
  const [wodScoresSorted, setWodScoresSorted] = useState(null);
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

    setWodScoresSorted(sorted);
  };

  // MOCK INFO
  const wods = [
    {
      description: "10 Rounds, 3 HSPU, 6 Dead Lift, 12 Pull Ups",
      timecap: 20,
      day: 1,
    },
    {
      description: "21-15-9, Snatches, Wall Ball Shots",
      timecap: 15,
      day: 2,
    },
  ];

  const wodScores = [
    {
      athlete: {
        first_name: "Diego",
        last_name: "Garnica",
      },
      score: {
        minutes: 13,
        seconds: 25,
      },
    },
    {
      athlete: {
        first_name: "Sergio",
        last_name: "Garnica",
      },
      score: {
        minutes: 10,
        seconds: 19,
      },
    },
    {
      athlete: {
        first_name: "Emilio",
        last_name: "Garnica",
      },
      score: {
        minutes: 8,
        seconds: 7,
      },
    },
  ];

  useEffect(() => {
    // wodActions.getWeeklyWods()

    setWod(null);
    wods.forEach((wod) => {
      if (wod.day === weekDay) setWod(wod);
    });

    if (wodScores) sortAscending(wodScores);
  }, [weekDay]);

  return (
    <div className="Leaderboard">
      <ContentContainer sidePadding={false}>
        <SearchBar placeholder="Buscar atleta" />

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
                  No disponible todavía
                </p>
              )}
              {wod && (
                <div className="Leaderboard__wod__body">
                  <p className="Leaderboard__wod__title">
                    {wod.description.split(",")[0]}
                  </p>
                  {wod?.description
                    .split(",")
                    .slice(1)
                    .map((line, index) => (
                      <p className="Leaderboard__wod__description" key={index}>
                        {line}
                      </p>
                    ))}
                  <p className="Leaderboard__wod__timecap">
                    Timecap: <span>{wod.timecap} min</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* LEADERBOARD LIST */}
          <div className="Leaderboard__body">
            <div className="Leaderboard__body__filters">
              <select name="" id="">
                <option value="">Filtros</option>
                <option value="1">Menos a más</option>
                <option value="1">Más a menos</option>
              </select>
            </div>
            <div className="Leaderboard__body__tags">
              <span>#</span>
              <span>Atleta</span>
              <span>Score</span>
            </div>
            {/* LIST */}
            {wodScoresSorted &&
              wodScoresSorted.map((score, index) => (
                <div className="Leaderboard__body__score" key={index}>
                  <span className="Leaderboard__body__score-position">
                    {index + 1}
                  </span>
                  <p className="Leaderboard__body__score-name">
                    {score.athlete.first_name} {score.athlete.last_name}
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
