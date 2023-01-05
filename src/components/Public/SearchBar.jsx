import SearchIcon from "../../assets/icon/search.svg";

function SearchBar({ placeholder, searchValue, setSearchValue, loading }) {
  return (
    <form action="" className="SearchBar">
      <div className="SearchBar__input-container">
        <img src={SearchIcon} alt="Search icon" className="SearchBar__icon" />
        <input
          type="text"
          className="SearchBar__input"
          placeholder={placeholder}
          value={searchValue}
          onChange={(event) => {
            console.log(event.target.value);
            setSearchValue(event.target.value);
          }}
          disabled={loading ? true : false}
        />
      </div>
    </form>
  );
}

export { SearchBar };
