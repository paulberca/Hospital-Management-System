"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Sidebar from "./components/Sidebar/Sidebar";
import PatientTable from "./components/PatientsScreen/PatientTable/PatientTable";
import SearchControls from "./components/PatientsScreen/SearchControls/SearchControls";
import { initialPatients } from "./data/patientData";
import StatsScreen from "./components/StatsScreen/StatsScreen";
import {
  getAllPatients,
  addNewPatient,
  updatePatient,
  deletePatient as removePatient,
  filterPatients,
  sortPatients,
} from "./services/patientService";

function PatientsPage() {
  const [currentPage, setCurrentPage] = useState("patients");
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Toggle add patient form
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    if (showAddForm) {
      setSelectedPatient(null);
    }
  };

  // Handle patient selection
  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setShowAddForm(true);
  };

  // Delete patient function
  const deletePatient = (id) => {
    const updatedPatients = removePatient(patients, id);
    setPatients(updatedPatients);
    setShowAddForm(false);
    setSelectedPatient(null);
  };

  // Add or update patient
  const addPatient = (patientData) => {
    if (selectedPatient) {
      // Update existing patient
      const updatedPatients = updatePatient(
        patients,
        selectedPatient.id,
        patientData
      );
      setPatients(updatedPatients);
    } else {
      // Add new patient
      setPatients(addNewPatient(patients, patientData));
    }
    setShowAddForm(false);
    setSelectedPatient(null);
  };

  useEffect(() => {
    // Load initial patients data
    setPatients(initialPatients);
  }, []);

  // Sort patients data when column header is clicked
  const sortByColumn = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Get filtered and sorted patients
  const getFilteredPatients = () => {
    // First filter by search term
    const filtered = filterPatients(patients, searchTerm);

    // Then apply sorting if needed
    return sortPatients(filtered, sortConfig);
  };

  // Get the filtered patients
  const filteredPatients = getFilteredPatients();

  return (
    <div className={styles.container}>
      <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} />
      <div className={styles.content}>
        {currentPage === "patients" ? (
          <>
            <h1 className={styles.contentTitle}>Patients Management</h1>
            <SearchControls
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onAddPatient={addPatient}
              onDeletePatient={deletePatient}
              showAddForm={showAddForm}
              onToggleAddForm={toggleAddForm}
              selectedPatient={selectedPatient}
            />
            <PatientTable
              patients={filteredPatients}
              onSort={sortByColumn}
              sortConfig={sortConfig}
              onSelectPatient={handleSelectPatient}
            />
          </>
        ) : (
          <StatsScreen patients={patients} />
        )}
      </div>
    </div>
  );
}

export default PatientsPage;
