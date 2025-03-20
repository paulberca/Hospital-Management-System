import React from "react";
import styles from "./PatientTable.module.css";

function PatientTable({ patients }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.patientsTable}>
        <thead>
          <tr>
            <th>Name</th>
            {/* <th>Date of Birth</th> */}
            <th>Gender</th>
            <th>Contact Number</th>
            {/* <th>Home Address</th> */}
            {/* <th>allergies</th> */}
            <th>Blood Type</th>
            {/* <th>Chronic Condition</th> */}
            {/* <th>Family Doctor</th> */}
            {/* <th>Insurance</th> */}
            <th>Admission Date</th>
            <th>Condition</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.name}</td>
              {/* <td>{patient.dateOfBirth}</td> */}
              <td>{patient.gender}</td>
              <td>{patient.contactNumber}</td>
              {/* <td>{patient.homeAddress}</td> */}
              {/* <td>{patient.allergies}</td> */}
              <td>{patient.bloodType}</td>
              {/* <td>{patient.chronicCondition}</td> */}
              {/* <td>{patient.familyDoctor}</td> */}
              {/* <td>{patient.insurance}</td> */}
              <td>{patient.admissionDate}</td>
              <td>{patient.condition}</td>
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
