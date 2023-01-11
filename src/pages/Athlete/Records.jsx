import { useState } from "react";
import { useDashboard } from "../../contexts/DashboardContext";

// COMPONENTS
import { AddButton } from "../../components/Public/AddButton";
import { AddRecordForm } from "../../components/Athlete/AddRecordForm";
import { AddRecordFormContainer } from "../../components/Athlete/AddRecordFormContainer";
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { DateWidget } from "../../components/Public/DateWidget";
import { PersonalGoal } from "../../components/Athlete/PersonalGoal";
import { PRCard } from "../../components/Athlete/PRCard";
import { SkillCard } from "../../components/Athlete/SkillCard";
import { SearchBar } from "../../components/Public/SearchBar";

// UTILS
import { info } from "../../utils/info";
import { utils } from "../../utils/utils";

// IMG
import AthleteImg from "../../assets/img/athlete.jpg";
import Athlete2Img from "../../assets/img/athlete_2.jpg";
import GymImg from "../../assets/img/bullet-crossfit-gym.jpg";
import HoodiesImg from "../../assets/img/sudaderas.jpg";
import UserIcon from "../../assets/icon/user.svg";

function Records() {
  const { setShowAddFormModal: setShowModal } = useDashboard();
  const [recordType, setRecordType] = useState(null);

  const prs = [
    {
      title: "Back Squat",
      value: 205,
      units: "lbs",
      date: "18 Jul 2022",
    },
    {
      title: "Power Snatch",
      value: 85,
      units: "lbs",
      date: "12 Jul 2022",
    },
    {
      title: "Squat Clean",
      value: 115,
      units: "lbs",
      date: "1 Feb 2022",
    },
    {
      title: "Apple Run",
      value: "6:27",
      units: "min",
      date: "25 Ene 2022",
    },
  ];

  const skills = [
    {
      title: "Muscle Ups",
      date: "2 Dic 2022",
    },
    {
      title: "Double Unders",
      date: "24 Nov 2021",
    },
  ];

  return (
    <div className="Records">
      <ContentContainer>
        <h1 className="title">Skill & Strength</h1>
        <DateWidget date={utils.getCurrentDate()} />

        {/* ADD NEW PR */}
        <AddButton
          img={AthleteImg}
          alt="CrossFit Athlete Front Rack Position"
          title="Nuevo PR"
          clickHandler={() => {
            setShowModal(true);
            setRecordType(
              info.components.addRecordForm.recordType.personalRecord
            );
          }}
        />

        {/* ADD NEW SKILL */}
        <AddButton
          clickHandler={() => {
            setShowModal(true);
            setRecordType(info.components.addRecordForm.recordType.newSkill);
          }}
          img={GymImg}
          alt="Bullet CrossFit Gym"
          title="Nueva Habilidad Desbloqueada"
        />

        {/* ADD NEW GOAL */}
        <AddButton
          clickHandler={() => {
            setShowModal(true);
            setRecordType(
              info.components.addRecordForm.recordType.personalGoal
            );
          }}
          img={Athlete2Img}
          alt="Bullet CrossFit shirt"
          title="Nueva Meta Mensual"
        />

        {/* Personal Goal */}
        <h2 className="subtitle">Tu meta personal</h2>
        <PersonalGoal
          link="#"
          date={"20 Ene 2023"}
          description="Du's"
          progress={60}
          status="En progreso"
        />

        {/* PRS */}
        <section className="Records__history">
          <h2 className="title">PRs</h2>
          <div className="Records__history__filters">
            <SearchBar placeholder="Buscar" />
            <select className="Records__history__filter-input">
              <option value="">Filtros</option>
              <option value="1">Menos a más</option>
              <option value="1">Más a menos</option>
            </select>
          </div>

          {/* PR LIST */}
          <div className="Records__history__list">
            {prs.map((pr, index) => (
              <PRCard
                key={index}
                title={pr.title}
                value={pr.value}
                units={pr.units}
                date={pr.date}
                link={info.routes.recordHistory + `/${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section className="Records__history">
          <h2 className="title">Skills</h2>
          <div className="Records__history__filters">
            <SearchBar placeholder="Buscar" />
            <select className="Records__history__filter-input">
              <option value="">Filtros</option>
              <option value="1">Menos a más</option>
              <option value="1">Más a menos</option>
            </select>
          </div>
          {/* PR LIST */}
          <div className="Records__history__list">
            {skills.map((pr, index) => (
              <SkillCard key={index} title={pr.title} date={pr.date} />
            ))}
          </div>
        </section>
      </ContentContainer>

      <AddRecordFormContainer>
        <AddRecordForm recordType={recordType} />
      </AddRecordFormContainer>
    </div>
  );
}

export { Records };
