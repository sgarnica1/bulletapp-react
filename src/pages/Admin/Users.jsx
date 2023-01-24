import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useUsers } from "../../hooks/useUser";
import { useDashboard } from "../../contexts/DashboardContext";

// COMPONENTS
import { BackButton } from "../../components/Public/BackButton";
import { ContentContainer } from "../../components/Layout/ContentContainer";
import { UserCard } from "../../components/Admin/UserCard";
import { ButtonSelectFilter } from "../../components/Public/ButtonSelectFilter";
import { SearchBar } from "../../components/Public/SearchBar";
import { SortByFilter } from "../../components/Public/SortByFilter";

// LOADING SKELETONS
import { WidgetLoadingSkeleton } from "../../components/Layout/LoadingSkeletons/WidgetLoadingSkeleton";

// UTILS
import { info } from "../../utils/info";
import { utils } from "../../utils/utils";

// TODO - SPLIT CODE INTO SMALLER COMPONENTS AND FUNCTIONS
const Users = () => {
  const { users, actions, loading } = useUsers();
  const { setActiveView } = useDashboard();

  // INITIAL STATES
  // TODO - Allow sorting
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [availableCategories, setAvailableCategories] = useState(new Set());
  const [orderByValue, setOrderByValue] = useState(
    info.components.sortby.label
  );
  const [category, setCategory] = useState(
    info.components.buttonSelectFilter.values.all
  );

  useEffect(() => {
    if (!users) actions.getUsers();

    setActiveView(info.views.users);
    if (loading) setSearch("");

    if (!loading && users) {
      users.sort((a, b) => b.created_at.seconds - a.created_at.seconds);
      setAvailableCategories(
        new Set([
          "6:00am",
          "7:30am",
          "8:30am",
          "5:30pm",
          "6:30pm",
          "7:30pm",
          "8:30pm",
        ])
      );
      setFilteredUsers(users);

      let filteredUsers = users;
      if (category !== "all")
        filteredUsers = users.filter((user) => user.group === category);

      category !== "all" && setFilteredUsers(filteredUsers);

      const searchedUsers = utils.searchDataFromInput(
        filteredUsers,
        search,
        "displayName"
      );
      setFilteredUsers(searchedUsers);

      const usersCopy = [...searchedUsers];

      let orderedUsers = [];
      if (info.components.sortby.options.mostRecent)
        orderedUsers = utils.sortByMostRecent(usersCopy, "created_at");

      if (info.components.sortby.options.oldest)
        orderedUsers = utils.sortByOldest(usersCopy, "created_at");

      if (info.components.sortby.options.az)
        orderedUsers = utils.sortAZOrder(usersCopy, "displayName");

      if (info.components.sortby.options.za)
        orderedUsers = utils.sortZAOrder(usersCopy, "displayName");

      if (info.components.sortby.label) orderedUsers = usersCopy;
      console.log(orderedUsers);
      setFilteredUsers(orderedUsers);

      // switch (orderByValue) {
      //   case info.components.sortby.options.mostRecent:
      //     orderedUsers = utils.sortByMostRecent(usersCopy, "created_at");
      //     setFilteredUsers(orderedUsers);
      //     break;
      //   case info.components.sortby.options.oldest:
      //     orderedUsers = utils.sortByOldest(usersCopy, "created_at");
      //     setFilteredUsers(orderedUsers);
      //     break;
      //   case info.components.sortby.options.az:
      //     orderedUsers = utils.sortAZOrder(usersCopy, "displayName");
      //     setFilteredUsers(orderedUsers);
      //     break;
      //   case info.components.sortby.options.za:
      //     orderedUsers = utils.sortZAOrder(usersCopy, "displayName");
      //     setFilteredUsers(orderedUsers);
      //     break;

      //   case info.components.sortby.label:
      //     setFilteredUsers(filteredUsers);
      //     break;
      //   default:
      //     break;
      // }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, loading, search, category, orderByValue]);

  return (
    <div className="MovementsLibrary">
      <ContentContainer>
        <BackButton link={info.routes.home} mb={true} />

        <h1 className="app-title">Usuarios</h1>

        <div className="Records__filters">
          <SearchBar
            placeholder="Buscar"
            searchValue={search}
            setSearchValue={setSearch}
            loading={loading}
            disabled={!users}
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
            <p className="app-meta-tag">Filtrar por horarios</p>
            <ButtonSelectFilter
              options={Array.from(availableCategories)}
              value={category}
              setValue={setCategory}
              // setSearch={setSearch}
              loading={loading}
            />
          </>
        )}

        <section className="Records__history">
          {/* Movement LIST */}
          <div className="Records__history__list">
            {loading &&
              !users &&
              new Array(10)
                .fill(0)
                .map((_, index) => (
                  <WidgetLoadingSkeleton type="movement-card" key={index} />
                ))}
          </div>

          {!loading && users.length === 0 && (
            <div className="Records__empty">No hay usuarios registrados</div>
          )}

          {!loading && filteredUsers.length === 0 && (
            <div className="Records__empty">
              No hay resultados para "{search}" en la categoría "
              {category === "all" ? "Todos" : category}"
            </div>
          )}

          <div className="Users__list">
            {!loading &&
              users &&
              filteredUsers &&
              filteredUsers.map((user, index) => (
                <UserCard key={index} user={user} />
              ))}
          </div>
        </section>
      </ContentContainer>
      <Outlet />
    </div>
  );
};

export { Users };
