import React from "react";
import styles from "./SearchControls.module.css";
import SearchBox from "./SearchBox/SearchBox";
import AddPatientButton from "./AddPatientButton/AddPatientButton";
import AddPatientForm from "../AddPatientForm/AddPatientForm";

function SearchControls({
  searchTerm,
  onSearchChange,
  onAddPatient,
  showAddForm,
  onToggleAddForm,
}) {
  return (
    <div className={styles.controls}>
      <SearchBox searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <AddPatientButton addNewPatient={onToggleAddForm} />

      {showAddForm && (
        <AddPatientForm onCancel={onToggleAddForm} onAdd={onAddPatient} />
      )}
    </div>
  );
}

export default SearchControls;
