import React from "react";
import styles from "./AddPatientButton.module.css";

function AddPatientButton({ addNewPatient }) {
  return (
    <button className={styles.addPatient} onClick={addNewPatient}>
      Add Patient
    </button>
  );
}

export default AddPatientButton;
