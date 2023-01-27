import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useWods } from "../../hooks/useWods";
import { useDashboard } from "../../contexts/DashboardContext";

// COMPONENTS
import { BackButton } from "../../components/Public/BackButton";
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { WodCard } from "../../components/Admin/WodCard";
import { ButtonSelectFilter } from "../../components/Public/ButtonSelectFilter";
import { SearchBar } from "../../components/Public/SearchBar";
import { SortByFilter } from "../../components/Public/SortByFilter";

// LOADING SKELETONS
import { WidgetLoadingSkeleton } from "../../components/Layout/LoadingSkeletons/WidgetLoadingSkeleton";

// UTILS
import { info } from "../../utils/info";
import { utils } from "../../utils/utils";
import RightArrow from "../../assets/icon/right-arrow.svg";
import LeftArrow from "../../assets/icon/left-arrow.svg";

// TODO - SPLIT CODE INTO SMALLER COMPONENTS AND FUNCTIONS
const Wods = () => {
  const { wods, actions, loading } = useWods();
  const { setActiveView } = useDashboard();

  // INITIAL STATES
  const [filteredWods, setFilteredWods] = useState([]);
  const [wodOfTheDay, setWodOfTheDay] = useState(null);
  const [search, setSearch] = useState("");
  const [availableCategories, setAvailableCategories] = useState(new Set());
  const [indexPage, setIndexPage] = useState(0);
  const [indexStep] = useState(6);

  const [orderByValue, setOrderByValue] = useState(
    info.components.sortby.label
  );
  const [category, setCategory] = useState(
    info.components.buttonSelectFilter.values.all
  );

  useEffect(() => {
    setActiveView(info.views.wods);
    if (loading) setSearch("");

    // fetch data
    if (!wods) actions.getAllWods();

    if (!loading && wods) {
      const todaysWod = wods.filter(
        (wod) =>
          new Date(wod.date.seconds * 1000).toDateString() ===
          new Date().toDateString()
      );
      setWodOfTheDay(todaysWod[0]);

      wods.sort((a, b) => b.date.seconds - a.date.seconds);

      const wodCategories = wods.map((wod) => wod.category).sort();
      setAvailableCategories(
        new Set(wodCategories.flat().filter((category) => category !== ""))
      );
      setFilteredWods(wods);

      let filteredWods = wods;
      if (category !== "all")
        filteredWods = wods.filter((wod) => wod.category === category);

      category !== "all" && setFilteredWods(filteredWods);

      const searchedWods = utils.searchDataFromInput(
        filteredWods,
        search,
        "title"
      );
      setFilteredWods(searchedWods);

      const wodsCopy = [...searchedWods];

      let orderedWods = [];

      switch (orderByValue) {
        case info.components.sortby.options.mostRecent:
          orderedWods = utils.sortByMostRecent(wodsCopy, "date");
          setFilteredWods(orderedWods);
          break;
        case info.components.sortby.options.oldest:
          orderedWods = utils.sortByOldest(wodsCopy, "date");
          setFilteredWods(orderedWods);
          break;
        case info.components.sortby.options.az:
          orderedWods = utils.sortAZOrder(wodsCopy, "title");
          setFilteredWods(orderedWods);
          break;
        case info.components.sortby.options.za:
          orderedWods = utils.sortZAOrder(wodsCopy, "title");
          setFilteredWods(orderedWods);
          break;

        case info.components.sortby.label:
          setFilteredWods(wodsCopy);
          break;
        default:
          break;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, search, category, orderByValue]); // activeStateCategory

  return (
    <div className="MovementsLibrary">
      <ContentContainer>
        <BackButton link={info.routes.home} mb={true} />

        {!loading && wods && wodOfTheDay && (
          <div className="Wods__today">
            <h2 className="app-title">WOD del día</h2>
            <WodCard wod={wodOfTheDay} />
          </div>
        )}

        <header className="MovementsLibrary__header">
          <h1 className="app-title">WODS</h1>
          {!loading && wods && filteredWods && (
            <span className="app-meta-tag">
              Resultados:{" "}
              {indexPage * indexStep + indexStep > filteredWods.length
                ? filteredWods.length
                : indexPage * indexStep + indexStep}{" "}
              / {filteredWods.length}
            </span>
          )}
        </header>

        <div className="Records__filters">
          <SearchBar
            placeholder="Buscar"
            searchValue={search}
            setSearchValue={setSearch}
            loading={loading}
            disabled={!wods || loading}
          />
          <SortByFilter
            setValue={setOrderByValue}
            loading={loading}
            options={[
              info.components.sortby.options.mostRecent,
              info.components.sortby.options.oldest,
              info.components.sortby.options.az,
              info.components.sortby.options.za,
            ]}
          />
        </div>

        {availableCategories && (
          <>
            <p className="app-meta-tag">Filtrar por categoría</p>
            <ButtonSelectFilter
              options={Array.from(availableCategories)}
              value={category}
              setValue={setCategory}
              loading={loading}
            />
          </>
        )}

        <section className="Wods__history">
          {loading && !wods && (
            <div className="Records__history__list">
              {new Array(10).fill(0).map((_, index) => (
                <WidgetLoadingSkeleton type="movement-card" key={index} />
              ))}
            </div>
          )}

          {!loading && wods.length === 0 && (
            <div className="Records__empty">No hay wods registrados</div>
          )}

          {!loading && filteredWods.length === 0 && (
            <div className="Records__empty">
              No hay resultados para "{search}" en la categoría "
              {category === "all" ? "Todos" : category}"
            </div>
          )}

          {!loading && wods && filteredWods && (
            <>
              <div className="Wods__results--header">
                <div className="Wods__results--header--title">
                  <h3 className="Wods__subtitle">Historial</h3>
                  <span className="app-meta-tag">
                    Resultados:{" "}
                    {indexPage * indexStep + indexStep > filteredWods.length
                      ? filteredWods.length
                      : indexPage * indexStep + indexStep}{" "}
                    / {filteredWods.length}
                  </span>
                </div>
                <div className="Wods__nav-btns">
                  {indexPage > 0 && (
                    <button
                      className="Wods__nav-btns--prev"
                      onClick={() => {
                        if (indexPage > 0) {
                          setIndexPage(indexPage - 1);
                        }
                      }}
                    >
                      <img src={LeftArrow} alt="Left green arrow" />
                    </button>
                  )}
                  {indexPage * indexStep + indexStep < filteredWods.length && (
                    <button
                      className="Wods__nav-btns--next"
                      onClick={() => {
                        setIndexPage(indexPage + 1);
                      }}
                    >
                      <img src={RightArrow} alt="Right green arrow" />
                    </button>
                  )}
                </div>
              </div>

              <div className="Wods__list">
                {filteredWods.map((wod, index) => {
                  if (
                    index >= indexPage * indexStep &&
                    index < (indexPage + 1) * indexStep
                  )
                    return <WodCard key={wod.id} wod={wod} />;
                })}
              </div>
            </>
          )}
        </section>
      </ContentContainer>
      <Outlet />
    </div>
  );
};

export { Wods };
