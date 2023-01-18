import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSkills } from "../../hooks/useSkills";
import { useAuth } from "../../contexts/AuthContext";

// COMPONENTS
import { BackButton } from "../../components/Public/BackButton";
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { SkillCard } from "../../components/Athlete/SkillCard";
import { ButtonSelectFilter } from "../../components/Public/ButtonSelectFilter";
import { SearchBar } from "../../components/Public/SearchBar";
import { SortByFilter } from "../../components/Public/SortByFilter";

// LOADING SKELETONS
import { WidgetLoadingSkeleton } from "../../components/Layout/LoadingSkeletons/WidgetLoadingSkeleton";

// UTILS
import { info } from "../../utils/info";
import { utils } from "../../utils/utils";

// IMG
import AddIcon from "../../assets/icon/add-green.svg";

const Skills = () => {
  const { user } = useAuth();
  const { skills, actions, loading, error } = useSkills();

  const [sortedSkills, setSortedSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);

  const [search, setSearch] = useState("");
  const [orderByValue, setOrderByValue] = useState(
    info.components.sortby.label
  );
  const [category, setCategory] = useState(
    info.components.buttonSelectFilter.values.all
  );
  const [availableCategories, setAvailableCategories] = useState(new Set());

  useEffect(() => {
    if (loading) setSearch("");
    if (loading && !skills) actions.getSkills(user.uid || user.user_id);

    if (skills && sortedSkills.length === 0) {
      const sorted = skills.sort((a, b) => b.date - a.date);
      setSortedSkills(sorted);
      setFilteredSkills(sorted);

      const categories = skills.map((skill) => skill.movement_category);
      setAvailableCategories(new Set(categories));
    }

    if (skills && !loading && filteredSkills) {
      let filteredByCategory = [];

      if (category !== "all") {
        filteredByCategory = sortedSkills.filter(
          (skill) => skill.movement_category === category
        );
        setFilteredSkills(filteredByCategory);
      } else {
        setFilteredSkills(sortedSkills);
      }

      const dataToSearch =
        category === "all" ? sortedSkills : filteredByCategory;

      const filteredMovements = utils.searchDataFromInput(
        dataToSearch,
        search,
        "movement"
      );
      setFilteredSkills(filteredMovements);

      const prsCopy = [...filteredMovements];

      let orderedSkills = [];
      switch (orderByValue) {
        case info.components.sortby.options.mostRecent:
          orderedSkills = utils.sortSkillsByMostRecent(prsCopy);
          setFilteredSkills(orderedSkills);
          break;
        case info.components.sortby.options.oldest:
          orderedSkills = utils.sortSkillsByOldest(prsCopy);
          setFilteredSkills(orderedSkills);
          break;
        case info.components.sortby.options.alphabetic:
          orderedSkills = utils.sortSkillsByAlphabeticalOrder(prsCopy);
          setFilteredSkills(orderedSkills);
          break;
        case info.components.sortby.label:
          setFilteredSkills(filteredMovements);
          break;
        default:
          break;
      }
    }
  }, [skills, loading, search, category, orderByValue]);

  return (
    <div className="PersonalRecords">
      <ContentContainer>
        <BackButton link={info.routes.home} mb={true} />

        <header className="Records__header">
          <h1 className="Records__header__title">
            Tus habilidades desbloqueadas
          </h1>
          <Link
            to={info.routes.skills.nested.add.absolutePath}
            className="Records__header__add-btn"
          >
            <img src={AddIcon} alt="Plus sign" />
          </Link>
        </header>

        <div className="Records__filters">
          <SearchBar
            placeholder="Buscar Skill"
            searchValue={search}
            setSearchValue={setSearch}
            loading={loading}
            disabled={sortedSkills.length === 0}
          />
          <SortByFilter setValue={setOrderByValue} loading={loading} />
        </div>

        {availableCategories && (
          <ButtonSelectFilter
            options={Array.from(availableCategories).sort()}
            value={category}
            setValue={setCategory}
            setSearch={setSearch}
            loading={loading}
          />
        )}

        <section className="Records__history">
          {/* Skill LIST */}
          <div className="Records__history__list">
            {loading &&
              new Array(10)
                .fill(0)
                .map((_, index) => (
                  <WidgetLoadingSkeleton type="record-card" key={index} />
                ))}
          </div>

          {!loading && sortedSkills.length === 0 && (
            <div className="Records__empty">
              Aún no has agregado ningún record personal
            </div>
          )}

          {!loading &&
            sortedSkills.length > 0 &&
            filteredSkills.length === 0 && (
              <div className="Records__empty">
                No hay resultados para "{search}" en la categoría "
                {category == "all" ? "Todos" : category}"
              </div>
            )}

          <div className="Records__history__list">
            {!loading &&
              filteredSkills &&
              filteredSkills.map((skill, index) => (
                <SkillCard
                  key={index}
                  title={skill.movement}
                  seconds={skill.date.seconds}
                />
              ))}
          </div>
        </section>
      </ContentContainer>
      <Outlet />
    </div>
  );
};

export { Skills };
