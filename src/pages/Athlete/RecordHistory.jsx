// COMPONENTS
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { DateWidget } from "../../components/Public/DateWidget";
import { UpdatePRWidget } from "../../components/Athlete/UpdatePRWidget";

// UTILS
import { utils } from "../../utils/utils";

function RecordHistory() {
  const prs = [
    {
      title: "Squat Clean",
      value: 205,
      units: "lbs",
      date: new Date("01-02-2023"),
    },
    {
      title: "Squat Clean",
      value: 85,
      units: "lbs",
      date: new Date("01-12-2022"),
    },
    {
      title: "Squat Clean",
      value: 115,
      units: "lbs",
      date: new Date("07-19-2022"),
    },
    {
      title: "Squat Clean",
      value: 165,
      units: "lbs",
      date: new Date("11-25-2022"),
    },
  ];
  const title = "Squat Clean";

  return (
    <div className="RecordHistory">
      <ContentContainer>
        <UpdatePRWidget />

        <section className="RecordHistory__records">
          {/* HEADER -- LAST PR */}
          <header className="RecordHistory__header">
            <h2 className="RecordHistory__title">{title}</h2>
            <p className="RecordHistory__latest-score">
              {prs.sort((a, b) => b.date - a.date)[0].value} {prs[0].units}
            </p>
            <DateWidget date={prs.sort()[0].date.toDateString()} />
          </header>
          {/* LIST */}
          <div className="RecordHistory__list">
            {prs
              .slice(1)
              .sort((a, b) => b.date - a.date)
              .map((pr, index) => {
                return (
                  <div className="RecordHistory__list-entry" key={index}>
                    <p className="RecordHistory__list-entry__value">
                      {pr.value} {pr.units}
                    </p>
                    <DateWidget date={pr.date.toDateString()} mb={false} />
                  </div>
                );
              })}
          </div>
        </section>
      </ContentContainer>
    </div>
  );
}

export { RecordHistory };
