import React from 'react';
import styles from './SearchControls.module.css';

function SearchControls({ searchTerm, onSearchChange, sortByDate, onSortToggle }) {
  return (
    <div className={styles.controls}>
      <div className={styles.searchContainer}>
        <input 
          type="text" 
          placeholder="Search patients by name..." 
          className={styles.searchInput}
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      <button 
        className={styles.sortButton}
        onClick={onSortToggle}
      >
        {sortByDate ? 'Sort by Admission Date (Descending)' : 'Sort by Admission Date (Ascending)'}
      </button>
    </div>
  );
}

export default SearchControls;
