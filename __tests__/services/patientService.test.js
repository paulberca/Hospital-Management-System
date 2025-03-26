import {
  getAllPatients,
  addNewPatient,
  updatePatient,
  deletePatient,
  filterPatients,
  sortPatients,
} from "../../app/services/patientService.js";

// Sample test data
const testPatients = [
  {
    id: 1,
    name: "Jane Cooper",
    dateOfBirth: "1985-06-15",
    gender: "Female",
    contactNumber: "(225) 555-0118",
    bloodType: "O+",
    admissionDate: "2023-05-15",
    condition: "Stable",
  },
  {
    id: 2,
    name: "Floyd Miles",
    dateOfBirth: "1992-02-20",
    gender: "Male",
    contactNumber: "(205) 555-0100",
    bloodType: "A-",
    admissionDate: "2023-06-20",
    condition: "Critical",
  },
  {
    id: 3,
    name: "Ronald Richards",
    dateOfBirth: "1978-11-12",
    gender: "Male",
    contactNumber: "(302) 555-0107",
    bloodType: "B+",
    admissionDate: "2023-04-10",
    condition: "Recovering",
  },
];

describe("Patient Service", () => {
  // Test getAllPatients
  describe("getAllPatients", () => {
    it("should return a new array with all patients", () => {
      const result = getAllPatients(testPatients);

      // Should be a new array instance, not the same reference
      expect(result).not.toBe(testPatients);

      // Should have the same content
      expect(result).toEqual(testPatients);
      expect(result.length).toBe(testPatients.length);
    });

    it("should handle empty array", () => {
      const result = getAllPatients([]);
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });
  });

  // Test addNewPatient
  describe("addNewPatient", () => {
    it("should add a new patient to the array", () => {
      const newPatient = {
        id: 4,
        name: "Robert Fox",
        dateOfBirth: "1995-03-18",
        gender: "Male",
        contactNumber: "(212) 555-0156",
        bloodType: "B-",
        admissionDate: "2023-02-28",
        condition: "Stable",
      };

      const result = addNewPatient(testPatients, newPatient);

      // Should be a new array
      expect(result).not.toBe(testPatients);

      // Should have the new patient
      expect(result.length).toBe(testPatients.length + 1);
      expect(result).toContainEqual(newPatient);
      expect(result[result.length - 1]).toEqual(newPatient);
    });

    it("should add a patient to an empty array", () => {
      const newPatient = {
        id: 1,
        name: "Test Patient",
        condition: "Stable",
      };

      const result = addNewPatient([], newPatient);
      expect(result.length).toBe(1);
      expect(result[0]).toEqual(newPatient);
    });
  });

  // Test updatePatient
  describe("updatePatient", () => {
    it("should update an existing patient", () => {
      const updatedInfo = {
        name: "Jane Cooper-Smith",
        condition: "Recovering",
      };

      const result = updatePatient(testPatients, 1, updatedInfo);

      // Should be a new array
      expect(result).not.toBe(testPatients);

      // Should have the same length
      expect(result.length).toBe(testPatients.length);

      // The updated patient should have new values
      const updatedPatient = result.find((p) => p.id === 1);
      expect(updatedPatient.name).toBe("Jane Cooper-Smith");
      expect(updatedPatient.condition).toBe("Recovering");

      // Other properties should remain unchanged
      expect(updatedPatient.dateOfBirth).toBe("1985-06-15");
      expect(updatedPatient.gender).toBe("Female");
    });

    it("should not modify the array if patient id is not found", () => {
      const updatedInfo = {
        name: "Not Found",
      };

      const result = updatePatient(testPatients, 999, updatedInfo);

      // Should be a new array but equal to original
      expect(result).not.toBe(testPatients);
      expect(result).toEqual(testPatients);
    });
  });

  // Test deletePatient
  describe("deletePatient", () => {
    it("should remove a patient from the array", () => {
      const result = deletePatient(testPatients, 2);

      // Should be a new array
      expect(result).not.toBe(testPatients);

      // Should have one less patient
      expect(result.length).toBe(testPatients.length - 1);

      // Should not contain the deleted patient
      expect(result.find((p) => p.id === 2)).toBeUndefined();

      // Should still contain other patients
      expect(result.find((p) => p.id === 1)).toBeDefined();
      expect(result.find((p) => p.id === 3)).toBeDefined();
    });

    it("should not modify the array if patient id is not found", () => {
      const result = deletePatient(testPatients, 999);

      // Should be a new array but equal to original
      expect(result).not.toBe(testPatients);
      expect(result).toEqual(testPatients);
      expect(result.length).toBe(testPatients.length);
    });

    it("should handle empty array", () => {
      const result = deletePatient([], 1);
      expect(result).toEqual([]);
    });
  });

  // Test filterPatients
  describe("filterPatients", () => {
    it("should filter patients by name matching search term", () => {
      const result = filterPatients(testPatients, "ron");

      expect(result.length).toBe(1);
      expect(result[0].id).toBe(3);
      expect(result[0].name).toBe("Ronald Richards");
    });

    it("should handle case-insensitive search", () => {
      const result1 = filterPatients(testPatients, "JANE");
      const result2 = filterPatients(testPatients, "jane");

      expect(result1.length).toBe(1);
      expect(result2.length).toBe(1);
      expect(result1[0].id).toBe(1);
      expect(result2[0].id).toBe(1);
    });

    it("should trim search term", () => {
      const result = filterPatients(testPatients, "  floyd  ");

      expect(result.length).toBe(1);
      expect(result[0].id).toBe(2);
    });

    it("should return all patients if search term is empty", () => {
      const result1 = filterPatients(testPatients, "");
      const result2 = filterPatients(testPatients, null);
      const result3 = filterPatients(testPatients, undefined);

      expect(result1).toEqual(testPatients);
      expect(result2).toEqual(testPatients);
      expect(result3).toEqual(testPatients);
    });

    it("should return empty array if no matches", () => {
      const result = filterPatients(testPatients, "xyz123");
      expect(result.length).toBe(0);
    });
  });

  // Test sortPatients
  describe("sortPatients", () => {
    it("should sort by name in ascending order", () => {
      const result = sortPatients(testPatients, {
        key: "name",
        direction: "ascending",
      });

      expect(result.length).toBe(testPatients.length);
      expect(result[0].name).toBe("Floyd Miles");
      expect(result[1].name).toBe("Jane Cooper");
      expect(result[2].name).toBe("Ronald Richards");
    });

    it("should sort by name in descending order", () => {
      const result = sortPatients(testPatients, {
        key: "name",
        direction: "descending",
      });

      expect(result.length).toBe(testPatients.length);
      expect(result[0].name).toBe("Ronald Richards");
      expect(result[1].name).toBe("Jane Cooper");
      expect(result[2].name).toBe("Floyd Miles");
    });

    it("should sort by admission date in ascending order", () => {
      const result = sortPatients(testPatients, {
        key: "admissionDate",
        direction: "ascending",
      });

      expect(result.length).toBe(testPatients.length);
      //   expect(result[0].admissionDate).toBe("2023-02-28"); // This doesn't exist in sample data, so test would fail
      expect(result[0].admissionDate).toBe("2023-04-10");
      expect(result[1].admissionDate).toBe("2023-05-15");
      expect(result[2].admissionDate).toBe("2023-06-20");
    });

    it("should sort by admission date in descending order", () => {
      const result = sortPatients(testPatients, {
        key: "admissionDate",
        direction: "descending",
      });

      expect(result.length).toBe(testPatients.length);
      expect(result[0].admissionDate).toBe("2023-06-20");
      expect(result[1].admissionDate).toBe("2023-05-15");
      expect(result[2].admissionDate).toBe("2023-04-10");
    });

    it("should sort by date of birth in ascending order", () => {
      const result = sortPatients(testPatients, {
        key: "dateOfBirth",
        direction: "ascending",
      });

      expect(result.length).toBe(testPatients.length);
      expect(result[0].dateOfBirth).toBe("1978-11-12");
      expect(result[1].dateOfBirth).toBe("1985-06-15");
      expect(result[2].dateOfBirth).toBe("1992-02-20");
    });

    it("should sort by date of birth in descending order", () => {
      const result = sortPatients(testPatients, {
        key: "dateOfBirth",
        direction: "descending",
      });

      expect(result.length).toBe(testPatients.length);
      expect(result[0].dateOfBirth).toBe("1992-02-20");
      expect(result[1].dateOfBirth).toBe("1985-06-15");
      expect(result[2].dateOfBirth).toBe("1978-11-12");
    });

    it("should return original array if sort config is null", () => {
      const result = sortPatients(testPatients, null);
      expect(result).toEqual(testPatients);
    });

    it("should handle empty array", () => {
      const result = sortPatients([], { key: "name", direction: "ascending" });
      expect(result).toEqual([]);
    });
  });
});
