import { InputLoadingSkeleton } from "../Layout/LoadingSkeletons/InputLoadingSkeleton";
import SearchIcon from "../../assets/icon/search.svg";
import CancelIcon from "../../assets/icon/cancel.svg";

function SearchBar({
  placeholder,
  searchValue,
  setSearchValue,
  loading,
  disabled,
}) {
  if (loading) return <InputLoadingSkeleton type="searchBar" />;

  return (
    <form action="" className="SearchBar" onSubmit={(e) => e.preventDefault()}>
      <div className="SearchBar__input-container">
        <img src={SearchIcon} alt="Search icon" className="SearchBar__icon" />
        <input
          type="text"
          className="SearchBar__input"
          placeholder={placeholder}
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          onBlur={(event) => {
            console.log(event.target.value);
            if (event.target.value === "") {
              setSearchValue("");
            }
          }}
          disabled={loading || disabled}
        />

        {searchValue !== "" && (
          <img
            className="SearchBar__reset"
            src={CancelIcon}
            alt="Cancel icon"
            onClick={() => setSearchValue("")}
          />
        )}
      </div>
    </form>
  );
}

export { SearchBar };
