import classes from "./SearchBar.module.css";

import SearchResults from "./SearchResults";

import { useState, useEffect, useRef } from "react";

import axios from "axios";

function SearchBar(props) {
  const [textSearch, setTextSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [inputIsClicked, setInputIsClicked] = useState(false);

  const initialRef = useRef(true);
  const searchInputRef = useRef();

  useEffect(() => {
    let timer;
    if (textSearch === "") {
      setInputIsClicked(false);
      setSearchResults([]);
    }
    if (initialRef.current === false && textSearch !== "") {
      timer = setTimeout(() => {
        axios
          .get(`/api/v1/products/?search=${textSearch}`)
          .then((res) => {
            setSearchResults(res.data.data.products);
          })
          .catch((err) => console.log(err));
      }, 1000);
    }
    initialRef.current = false;
    return () => clearTimeout(timer);
  }, [textSearch]);

  const onChangeSearchResults = (e) => {
    setInputIsClicked(true);
    setTextSearch(e.target.value);
  };

  const onClickResetTextSearch = () => {
    setInputIsClicked(false);
    searchInputRef.current.value = "";
    setTextSearch("");
  };

  const onClickInputSearch = () => {
    setInputIsClicked(true);
  };

  const onBlurInputSearch = () => {
    setTimeout(() => {
      searchInputRef.current.value = "";
      setInputIsClicked(false);
    }, 1000);
  };

  const styledContainer =
    props.isNotActive === false
      ? `${classes["display-container"]}`
      : `${classes["container"]}`;

  return (
    <div className={styledContainer}>
      <form
        className={classes["form-search-bar"]}
        onChange={onChangeSearchResults}
      >
        <input
          className={classes["search-bar"]}
          type="text"
          placeholder="Search for product name."
          ref={searchInputRef}
          onInput={onClickInputSearch}
          onBlur={onBlurInputSearch}
        />
      </form>
      <ul className={classes["search-results__container"]}>
        {searchResults.length > 0 && inputIsClicked === true
          ? searchResults.map((result) => (
              <SearchResults
                key={result._id}
                id={result._id}
                name={result.name}
                imageCover={result.imageCover}
                onClickResetTextSearch={onClickResetTextSearch}
              />
            ))
          : ""}

        {searchResults.length === 0 && inputIsClicked === true && (
          <SearchResults name="There is no product" />
        )}
      </ul>
    </div>
  );
}

export default SearchBar;
