import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { usePRs } from "../../hooks/usePRs";
import { useAuth } from "../../contexts/AuthContext";

// COMPONENTS
import { BackButton } from "../../components/Public/BackButton";
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { PRCard } from "../../components/Athlete/PRCard";
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

const PersonalRecords = () => {
  const { prs, actions, loading, error } = usePRs();
  const { user } = useAuth();

  const [sortedPRs, setSortedPRs] = useState([]);
  const [filteredPRs, setFilteredPRs] = useState([]);

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
    if (!loading && !prs) actions.getPRs(user.uid || user.user_id);

    if (prs && sortedPRs.length === 0) {
      prs.forEach((pr) =>
        pr.scores.sort((a, b) => b.date.seconds - a.date.seconds)
      );

      const sorted = prs.sort(
        (a, b) => b.scores[0].date.seconds - a.scores[0].date.seconds
      );
      setSortedPRs(sorted);
      setFilteredPRs(sorted);

      const categories = prs.map((pr) => pr.movement_category);
      setAvailableCategories(new Set(categories));
    }

    if (prs && !loading && filteredPRs) {
      let filteredByCategory = [];

      if (category !== "all") {
        filteredByCategory = sortedPRs.filter(
          (pr) => pr.movement_category === category
        );
        setFilteredPRs(filteredByCategory);
      } else {
        setFilteredPRs(sortedPRs);
      }

      const dataToSearch = category === "all" ? sortedPRs : filteredByCategory;

      const filteredMovements = utils.searchDataFromInput(
        dataToSearch,
        search,
        "movement"
      );
      setFilteredPRs(filteredMovements);

      const prsCopy = [...filteredMovements];

      let orderedPRs = [];
      switch (orderByValue) {
        case info.components.sortby.options.mostRecent:
          orderedPRs = utils.sortPrsByMostRecent(prsCopy);
          setFilteredPRs(orderedPRs);
          break;
        case info.components.sortby.options.oldest:
          orderedPRs = utils.sortPrsByOldest(prsCopy);
          setFilteredPRs(orderedPRs);
          break;
        case info.components.sortby.options.alphabetic:
          orderedPRs = utils.sortPrsByAlphabeticalOrder(prsCopy);
          setFilteredPRs(orderedPRs);
          break;
        case info.components.sortby.label:
          setFilteredPRs(filteredMovements);
          break;
        default:
          break;
      }
    }
  }, [prs, loading, search, category, orderByValue]);

  return (
    <div className="PersonalRecords">
      <ContentContainer>
        <BackButton link={info.routes.home} mb={true} />

        <header className="Records__header">
          <h1 className="Records__header__title">Tus records personales</h1>
          <Link
            to={info.routes.prs.nested.add.absolutePath}
            className="Records__header__add-btn"
          >
            <img src={AddIcon} alt="Plus sign" />
          </Link>
        </header>

        <div className="Records__filters">
          <SearchBar
            placeholder="Buscar PR"
            searchValue={search}
            setSearchValue={setSearch}
            loading={loading}
            disabled={sortedPRs.length === 0}
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
          {/* PR LIST */}
          <div className="Records__history__list">
            {loading &&
              new Array(10)
                .fill(0)
                .map((_, index) => (
                  <WidgetLoadingSkeleton type="record-card" key={index} />
                ))}
          </div>

          {!loading && sortedPRs.length === 0 && (
            <div className="Records__empty">
              Aún no has agregado ningún record personal
            </div>
          )}

          {!loading && sortedPRs.length > 0 && filteredPRs.length === 0 && (
            <div className="Records__empty">
              No hay resultados para "{search}" en la categoría "
              {category == "all" ? "Todos" : category}"
            </div>
          )}

          <div className="Records__history__list">
            {!loading &&
              filteredPRs &&
              filteredPRs.map((pr, index) => (
                <PRCard
                  key={index}
                  title={pr.movement}
                  value={pr.scores[0].value}
                  units={pr.units}
                  seconds={pr.scores[0].date.seconds}
                  scoreType={pr.score_type}
                  link={
                    info.routes.prs.nested.history.absolutePathNoParms +
                    `/${utils.formatTitleToUrl(pr.movement)}-${pr.id}`
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

export { PersonalRecords };
