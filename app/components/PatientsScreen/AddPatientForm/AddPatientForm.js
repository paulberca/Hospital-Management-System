import React, { useState } from "react";
import styles from "./AddPatientForm.module.css";

function AddPatientForm({ onCancel, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    contactNumber: "",
    homeAddress: "",
    allergies: "",
    bloodType: "",
    chronicCondition: "",
    familyDoctor: "",
    insurance: "",
    condition: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format allergies as an array
    const allergiesArray = formData.allergies
      ? formData.allergies.split(",").map((item) => item.trim())
      : ["None"];

    // Add current date as admission date and generate id
    const newPatient = {
      ...formData,
      id: Date.now(), // Use timestamp as id
      allergies: allergiesArray,
      admissionDate: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    };

    onAdd(newPatient);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Add New Patient</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="dateOfBirth">Date of Birth *</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                required
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contactNumber">Contact Number *</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                required
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="homeAddress">Home Address</label>
              <input
                type="text"
                id="homeAddress"
                name="homeAddress"
                value={formData.homeAddress}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="allergies">Allergies (comma separated)</label>
              <input
                type="text"
                id="allergies"
                name="allergies"
                placeholder="e.g. Penicillin, Peanuts, Latex"
                value={formData.allergies}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bloodType">Blood Type *</label>
              <select
                id="bloodType"
                name="bloodType"
                required
                value={formData.bloodType}
                onChange={handleChange}
              >
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="chronicCondition">Chronic Condition</label>
              <input
                type="text"
                id="chronicCondition"
                name="chronicCondition"
                value={formData.chronicCondition}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="familyDoctor">Family Doctor</label>
              <input
                type="text"
                id="familyDoctor"
                name="familyDoctor"
                value={formData.familyDoctor}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="insurance">Insurance</label>
              <input
                type="text"
                id="insurance"
                name="insurance"
                value={formData.insurance}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="condition">Condition *</label>
              <select
                id="condition"
                name="condition"
                required
                value={formData.condition}
                onChange={handleChange}
              >
                <option value="Stable">Stable</option>
                <option value="Critical">Critical</option>
                <option value="Recovering">Recovering</option>
              </select>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className={styles.addButton}>
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPatientForm;
