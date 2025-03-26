import React, { useState, useEffect } from "react";
import styles from "./PatientInfoForm.module.css";

function AddPatientForm({ onCancel, onAdd, onDelete, selectedPatient }) {
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

  const [errors, setErrors] = useState({
    dateOfBirth: "",
  });

  // Populate form when editing an existing patient
  useEffect(() => {
    if (selectedPatient) {
      const allergiesString = Array.isArray(selectedPatient.allergies)
        ? selectedPatient.allergies.join(", ")
        : selectedPatient.allergies;

      setFormData({
        name: selectedPatient.name || "",
        dateOfBirth: selectedPatient.dateOfBirth || "",
        gender: selectedPatient.gender || "Male",
        contactNumber: selectedPatient.contactNumber || "",
        homeAddress: selectedPatient.homeAddress || "",
        allergies: allergiesString || "",
        bloodType: selectedPatient.bloodType || "O+",
        chronicCondition: selectedPatient.chronicCondition || "",
        familyDoctor: selectedPatient.familyDoctor || "",
        insurance: selectedPatient.insurance || "",
        condition: selectedPatient.condition || "Stable",
      });

      // Validate pre-filled date of birth
      if (selectedPatient.dateOfBirth) {
        validateDateOfBirth(selectedPatient.dateOfBirth);
      }
    }
  }, [selectedPatient]);

  const validateDateOfBirth = (dateString) => {
    if (!dateString) return "";

    const dob = new Date(dateString);
    const today = new Date();

    // Check if date is in the future
    if (dob > today) {
      return "Date of birth cannot be in the future";
    }

    // Check if age is reasonable (less than 120 years)
    const maxAge = 120;
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - maxAge);

    if (dob < minDate) {
      return "Patient age exceeds 120 years, please verify";
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate date of birth when it changes
    if (name === "dateOfBirth") {
      const errorMessage = validateDateOfBirth(value);
      setErrors({
        ...errors,
        dateOfBirth: errorMessage,
      });
    }
  };

  const handleDelete = () => {
    if (
      selectedPatient &&
      window.confirm("Are you sure you want to delete this patient?")
    ) {
      onDelete(selectedPatient.id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for validation errors before submitting
    const dobError = validateDateOfBirth(formData.dateOfBirth);
    if (dobError) {
      setErrors({
        ...errors,
        dateOfBirth: dobError,
      });
      return;
    }

    // Format allergies as an array
    const allergiesArray = formData.allergies
      ? formData.allergies.split(",").map((item) => item.trim())
      : ["None"];

    const patientData = {
      ...formData,
      allergies: allergiesArray,
    };

    // If we're adding a new patient, add id and admission date
    if (!selectedPatient) {
      patientData.id = Date.now(); // Use timestamp as id
      patientData.admissionDate = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
    } else {
      // Preserve original id and admission date for existing patients
      patientData.id = selectedPatient.id;
      patientData.admissionDate = selectedPatient.admissionDate;
    }

    onAdd(patientData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>{selectedPatient ? "Edit Patient" : "Add New Patient"}</h2>
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
                className={errors.dateOfBirth ? styles.inputError : ""}
              />
              {errors.dateOfBirth && (
                <span className={styles.errorMessage}>
                  {errors.dateOfBirth}
                </span>
              )}
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
            {selectedPatient ? (
              <button
                type="button"
                className={styles.cancelButton}
                onClick={handleDelete}
              >
                Delete Patient
              </button>
            ) : (
              <button
                type="button"
                className={styles.cancelButton}
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
            <button type="submit" className={styles.addButton}>
              {selectedPatient ? "Update Patient" : "Add Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPatientForm;
