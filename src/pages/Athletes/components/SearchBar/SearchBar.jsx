import "./search-bar.scss";

function SearchBar({ searchValue, setSearchValue, loading }) {
  return (
    <form action="" className="SearchBar">
      <div className="SearchBar__input-container">
        <span className="SearchBar__icon"></span>
        <input
          type="text"
          className="SearchBar__input"
          placeholder="Buscar atletas"
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
          disabled={loading ? true : false}
        />
      </div>
    </form>
  );
}

export { SearchBar };
