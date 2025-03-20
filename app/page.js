"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Sidebar from "./components/PatientsScreen/Sidebar/Sidebar";
import PatientTable from "./components/PatientsScreen/PatientTable/PatientTable";
import SearchControls from "./components/PatientsScreen/SearchControls/SearchControls";
import { initialPatients } from "./data/patientData";

function PatientsPage() {
  const [patients, setPatients] = useState(initialPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByDate, setSortByDate] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState(initialPatients);

  useEffect(() => {
    let result = [...patients];

    // Filter patients by name
    if (searchTerm) {
      result = result.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    // Sort by admission date if needed
    if (sortByDate) {
      result = result.sort(
        (a, b) => new Date(a.admissionDate) - new Date(b.admissionDate)
      );
    } else {
      result = result.sort(
        (a, b) => new Date(b.admissionDate) - new Date(a.admissionDate)
      );
    }

    setFilteredPatients(result);
  }, [patients, searchTerm, sortByDate]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleSort = () => {
    setSortByDate(!sortByDate);
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <h2 className={styles.contentTitle}>Patient List</h2>
        <SearchControls
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          sortByDate={sortByDate}
          onSortToggle={toggleSort}
        />
        <PatientTable patients={filteredPatients} />
      </div>
    </div>
  );
}

export default PatientsPage;
