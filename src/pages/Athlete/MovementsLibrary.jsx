import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useMovements } from "../../hooks/useMovements";
import { useSkills } from "../../hooks/useSkills";
import { useDashboard } from "../../contexts/DashboardContext";

// COMPONENTS
import { BackButton } from "../../components/Public/BackButton";
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { MovementCard } from "../../components/Athlete/MovementCard";
import { ButtonSelectFilter } from "../../components/Public/ButtonSelectFilter";
import { SearchBar } from "../../components/Public/SearchBar";
import { SortByFilter } from "../../components/Public/SortByFilter";

// LOADING SKELETONS
import { WidgetLoadingSkeleton } from "../../components/Layout/LoadingSkeletons/WidgetLoadingSkeleton";

// UTILS
import { info } from "../../utils/info";
import { utils } from "../../utils/utils";

// TODO - SPLIT CODE INTO SMALLER COMPONENTS AND FUNCTIONS
const MovementsLibrary = ({ skillsOnly = false }) => {
  const { user } = useAuth();
  const { setActiveView } = useDashboard();
  const { movements, actions, loading } = useMovements();
  const {
    skills,
    actions: actionsSkills,
    loading: loadingSkills,
  } = useSkills();

  // INITIAL STATES
  const [sortedMovements, setSortedMovements] = useState([]);
  const [filteredMovements, setFilteredMovements] = useState([]);
  const [search, setSearch] = useState("");
  const [availableCategories, setAvailableCategories] = useState(new Set());
  const [orderByValue, setOrderByValue] = useState(
    info.components.sortby.label
  );
  const [category, setCategory] = useState(
    info.components.buttonSelectFilter.values.all
  );

  useEffect(() => {
    skillsOnly
      ? setActiveView(info.views.skills)
      : setActiveView(info.views.records);
    if (loading) setSearch("");

    // Fetch movements and skills
    if (loading && !movements && !skills) {
      actions.getMovements();
    }
    if (loadingSkills && movements && !skills)
      actionsSkills.getSkillsNameListByUserId(user.uid || user.user_id);

    // Sort movements
    if (movements && sortedMovements.length === 0) {
      // Get params from urls and set skills only
      const sorted = movements.sort((a, b) => a.name.localeCompare(b.name));
      setSortedMovements(sorted);
      setFilteredMovements(sorted);
    }

    // FILTER MOVEMENTS
    if (movements && !loading && filteredMovements) {
      const categories = !skillsOnly
        ? movements.map((movement) => movement.movement_category)
        : ["Desbloqueadas", "Bloqueadas"];

      setAvailableCategories(new Set(categories.flat()));

      if (!categories.flat().includes(category)) setCategory("all");

      let filteredByCategory = [];

      if (category !== "all") {
        if (skillsOnly) {
          if (category === "Desbloqueadas") {
            filteredByCategory = sortedMovements.filter((movement) =>
              skills.includes(movement.name)
            );
            setFilteredMovements(filteredByCategory);
          } else if (category === "Bloqueadas") {
            filteredByCategory = sortedMovements.filter(
              (movement) =>
                !skills.includes(movement.name) &&
                movement.movement_category.includes("Skills")
            );
            setFilteredMovements(filteredByCategory);
          }
        }

        if (!skillsOnly)
          filteredByCategory = sortedMovements.filter((movement) =>
            movement.movement_category.includes(category)
          );

        setFilteredMovements(filteredByCategory);
      } else if (skillsOnly) {
        filteredByCategory = sortedMovements.filter((movement) =>
          movement.movement_category.includes("Skills")
        );
        setFilteredMovements(filteredByCategory);
      } else {
        setFilteredMovements(sortedMovements);
      }

      const dataToSearch =
        category === "all" && !skillsOnly
          ? sortedMovements
          : filteredByCategory;

      const filteredMovements = utils.searchDataFromInput(
        dataToSearch,
        search,
        "name"
      );
      setFilteredMovements(filteredMovements);

      const prsCopy = [...filteredMovements];

      let orderedMovements = [];
      switch (orderByValue) {
        case info.components.sortby.options.az:
          orderedMovements = utils.sortAZOrder(prsCopy, "name");
          setFilteredMovements(orderedMovements);
          break;
        case info.components.sortby.options.za:
          orderedMovements = utils.sortZAOrder(prsCopy, "name");
          setFilteredMovements(orderedMovements);
          break;

        case info.components.sortby.label:
          setFilteredMovements(filteredMovements);
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movements, loading, search, category, orderByValue, skillsOnly]);

  return (
    <div className="MovementsLibrary">
      <ContentContainer>
        <BackButton link={info.routes.home} mb={true} />

        <h1 className="app-title">
          Biblioteca de {skillsOnly ? "habilidades" : "movimientos"}
        </h1>

        <div className="Records__filters">
          <SearchBar
            placeholder="Buscar"
            searchValue={search}
            setSearchValue={setSearch}
            loading={loading}
            disabled={sortedMovements.length === 0}
          />
          <SortByFilter
            setValue={setOrderByValue}
            loading={loading}
            options={[
              info.components.sortby.options.az,
              info.components.sortby.options.za,
            ]}
          />
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
          {/* Movement LIST */}
          <div className="Records__history__list">
            {loading &&
              loadingSkills &&
              new Array(10)
                .fill(0)
                .map((_, index) => (
                  <WidgetLoadingSkeleton type="movement-card" key={index} />
                ))}
          </div>

          {!loading && sortedMovements.length === 0 && (
            <div className="Records__empty">
              Aún no has agregado ningún record personal
            </div>
          )}

          {!loading &&
            sortedMovements.length > 0 &&
            filteredMovements.length === 0 && (
              <div className="Records__empty">
                No hay resultados para "{search}" en la categoría "
                {category === "all" ? "Todos" : category}"
              </div>
            )}

          <div className="Records__history__list">
            {!loading &&
              !loadingSkills &&
              filteredMovements &&
              filteredMovements.map((movement, index) => (
                <MovementCard
                  key={index}
                  title={movement.name}
                  categories={movement.movement_category}
                  unlockedSkill={skills.includes(movement.name)}
                  skillsOnly={
                    skillsOnly ||
                    category === info.firebase.values.movementCategories.skills
                  }
                  link={
                    info.routes.movements.nested.tracking.absolutePathNoParms +
                    `/${utils.formatTitleToUrl(movement.name)}-${movement.id}`
                  }
                />
              ))}
          </div>
        </section>
      </ContentContainer>
      <Outlet />
    </div>
  );
};

export { MovementsLibrary };
