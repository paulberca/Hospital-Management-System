/**
 * Patient CRUD operations service
 */

// Get all patients
export const getAllPatients = (patients) => {
  return [...patients];
};

// Add a new patient
export const addNewPatient = (patients, patientData) => {
  // Add new patient with the submitted data
  return [...patients, patientData];
};

// Update an existing patient
export const updatePatient = (patients, patientId, patientData) => {
  // Update existing patient with the submitted data
  return patients.map((patient) =>
    patient.id === patientId ? { ...patient, ...patientData } : patient
  );
};

// Delete a patient
export const deletePatient = (patients, patientId) => {
  // Remove patient by ID
  return patients.filter((patient) => patient.id !== patientId);
};

// Filter patients by search term
export const filterPatients = (patients, searchTerm) => {
  if (!searchTerm) return patients;

  return patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );
};

// Sort patients by a specific column
export const sortPatients = (patients, sortConfig) => {
  if (!sortConfig) return patients;

  return [...patients].sort((a, b) => {
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
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    }
  });
};
