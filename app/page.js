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
  const [sortConfig, setSortConfig] = useState({
    key: "admissionDate",
    direction: "descending",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // Sort function for any column
  const sortByColumn = (key) => {
    let direction = "ascending";

    // If already sorting by this key, toggle direction
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  // Toggle add patient form
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  // Add new patient
  const addPatient = (newPatient) => {
    setPatients([...patients, newPatient]);
    setShowAddForm(false);
  };

  useEffect(() => {
    let result = [...patients];

    // Filter patients by name
    if (searchTerm) {
      result = result.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    // Sort based on sortConfig
    if (sortConfig) {
      result.sort((a, b) => {
        // For date fields
        if (
          sortConfig.key === "admissionDate" ||
          sortConfig.key === "dateOfBirth"
        ) {
          const dateA = new Date(a[sortConfig.key]);
          const dateB = new Date(b[sortConfig.key]);

          if (sortConfig.direction === "ascending") {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        }
        // For string fields
        else {
          const valueA = String(a[sortConfig.key]).toLowerCase();
          const valueB = String(b[sortConfig.key]).toLowerCase();

          if (sortConfig.direction === "ascending") {
            return valueA.localeCompare(valueB);
          } else {
            return valueB.localeCompare(valueA);
          }
        }
      });
    }

    setFilteredPatients(result);
  }, [patients, searchTerm, sortConfig]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
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
          showAddForm={showAddForm}
          onToggleAddForm={toggleAddForm}
          onAddPatient={addPatient}
        />
        <PatientTable
          patients={filteredPatients}
          onSort={sortByColumn}
          sortConfig={sortConfig}
        />
      </div>
    </div>
  );
}

export default PatientsPage;
