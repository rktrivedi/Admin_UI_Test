import React, {useState} from "react";
import {FaSearch} from "react-icons/fa";
import styles from "./Search.module.css";

const Search = ({onSearch}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    if (event.target) {
      setSearchQuery(event.target.value);
      onSearch(event.target.value);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchBar}
        type="text"
        placeholder="Search by any field"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <FaSearch className={styles.searchIcon} />
    </div>
  );
};

export default Search;
