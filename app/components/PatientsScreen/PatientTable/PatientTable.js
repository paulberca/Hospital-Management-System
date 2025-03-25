import React from "react";
import styles from "./PatientTable.module.css";

function PatientTable({ patients, onSort, sortConfig, onSelectPatient }) {
  const getHeaderClassName = (column) => {
    if (!sortConfig) return styles.sortable;

    return sortConfig.key === column
      ? sortConfig.direction === "ascending"
        ? `${styles.sortable} ${styles.ascending}`
        : `${styles.sortable} ${styles.descending}`
      : styles.sortable;
  };

  // Determine if we should color rows by condition (when sorting by condition)
  const colorRowsByCondition = sortConfig && sortConfig.key === "condition";

  // Get row class based on condition and sorting state
  const getRowClassName = (patient) => {
    let className = styles.patientRow;

    if (colorRowsByCondition) {
      const conditionClass = `${patient.condition.toLowerCase()}Row`;
      className = `${className} ${styles[conditionClass]}`;
    }

    return className;
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.patientsTable}>
        <thead>
          <tr>
            <th
              className={getHeaderClassName("name")}
              onClick={() => onSort("name")}
            >
              Name
              <span className={styles.sortIcon}></span>
            </th>
            <th className={styles.notSortable}>
              Gender
              <span className={styles.sortIcon}></span>
            </th>
            <th className={styles.notSortable}>
              Contact Number
              <span className={styles.sortIcon}></span>
            </th>
            <th className={styles.notSortable}>
              Blood Type
              <span className={styles.sortIcon}></span>
            </th>
            <th
              className={getHeaderClassName("admissionDate")}
              onClick={() => onSort("admissionDate")}
            >
              Admission Date
              <span className={styles.sortIcon}></span>
            </th>
            <th
              className={getHeaderClassName("condition")}
              onClick={() => onSort("condition")}
            >
              Condition
              <span className={styles.sortIcon}></span>
            </th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr
              key={patient.id}
              onClick={() => onSelectPatient(patient)}
              className={getRowClassName(patient)}
            >
              <td>{patient.name}</td>
              <td>{patient.gender}</td>
              <td>{patient.contactNumber}</td>
              <td>{patient.bloodType}</td>
              <td>{patient.admissionDate}</td>
              <td className={styles[patient.condition.toLowerCase()]}>
                {patient.condition}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {patients.length === 0 && (
        <div className={styles.noResults}>
          No patients found matching your search criteria.
        </div>
      )}
    </div>
  );
}

export default PatientTable;
