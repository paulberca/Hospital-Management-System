import React from "react";
import styles from "./SearchControls.module.css";
import SearchBox from "./SearchBox/SearchBox";
import AddPatientButton from "./AddPatientButton/AddPatientButton";
import AddPatientForm from "../PatientInfoForm/PatientInfoForm";

function SearchControls({
  searchTerm,
  onSearchChange,
  onAddPatient,
  onDeletePatient,
  showAddForm,
  onToggleAddForm,
  selectedPatient,
}) {
  return (
    <div className={styles.controls}>
      <SearchBox searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <AddPatientButton addNewPatient={onToggleAddForm} />

      {showAddForm && (
        <AddPatientForm
          onCancel={onToggleAddForm}
          onAdd={onAddPatient}
          onDelete={onDeletePatient}
          selectedPatient={selectedPatient}
        />
      )}
    </div>
  );
}

export default SearchControls;
