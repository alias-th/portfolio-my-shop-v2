import classes from "./SearchBar.module.css";

function SearchBar() {
  return (
    <form className={classes["form-search-bar"]}>
      <input
        className={classes["search-bar"]}
        type="text"
        placeholder="Search for products"
      />
      <button className="button-style-1">Search</button>
    </form>
  );
}

export default SearchBar;
