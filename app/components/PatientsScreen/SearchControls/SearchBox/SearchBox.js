import React from "react";
import styles from "./SearchBox.module.css";

function SearchBox({ searchTerm, onSearchChange }) {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search patients by name..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
}

export default SearchBox;
