import React from "react";
import styles from "./StatsScreen.module.css";

function StatsScreen({ patients }) {
  // Calculate statistics from patient data
  const calculateStats = () => {
    // Total number of patients
    const totalPatients = patients.length;

    // Count patients by condition
    const conditionCounts = patients.reduce((acc, patient) => {
      const condition = patient.condition.toLowerCase();
      acc[condition] = (acc[condition] || 0) + 1;
      return acc;
    }, {});

    // Count patients by gender
    const genderCounts = patients.reduce((acc, patient) => {
      acc[patient.gender] = (acc[patient.gender] || 0) + 1;
      return acc;
    }, {});

    // Average age calculation
    const currentYear = new Date().getFullYear();
    const ages = patients.map((patient) => {
      const birthYear = new Date(patient.dateOfBirth).getFullYear();
      return currentYear - birthYear;
    });
    const totalAge = ages.reduce((sum, age) => sum + age, 0);
    const averageAge = totalAge / ages.length;

    // Patients admitted this year
    const currentYearAdmissions = patients.filter((patient) => {
      return new Date(patient.admissionDate).getFullYear() === currentYear;
    }).length;

    return {
      totalPatients,
      conditionCounts,
      genderCounts,
      averageAge: averageAge.toFixed(1),
      currentYearAdmissions,
    };
  };

  const stats = calculateStats();

  return (
    <div className={styles.statsContainer}>
      <h2 className={styles.statsTitle}>Hospital Statistics</h2>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Patients</h3>
          <div className={styles.statValue}>{stats.totalPatients}</div>
        </div>

        <div className={styles.statCard}>
          <h3>Average Age</h3>
          <div className={styles.statValue}>{stats.averageAge} years</div>
        </div>

        <div className={styles.statCard}>
          <h3>Admissions This Year</h3>
          <div className={styles.statValue}>{stats.currentYearAdmissions}</div>
        </div>
      </div>

      <div className={styles.chartSection}>
        <div className={styles.chartContainer}>
          <h3>Patients by Condition</h3>
          <div className={styles.conditionStats}>
            <div className={styles.statRow}>
              <span>Stable</span>
              <div className={styles.statBar}>
                <div
                  className={`${styles.statBarFill} ${styles.stableBar}`}
                  style={{
                    width: `${
                      ((stats.conditionCounts.stable || 0) /
                        stats.totalPatients) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <span>{stats.conditionCounts.stable || 0}</span>
            </div>
            <div className={styles.statRow}>
              <span>Recovering</span>
              <div className={styles.statBar}>
                <div
                  className={`${styles.statBarFill} ${styles.recoveringBar}`}
                  style={{
                    width: `${
                      ((stats.conditionCounts.recovering || 0) /
                        stats.totalPatients) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <span>{stats.conditionCounts.recovering || 0}</span>
            </div>
            <div className={styles.statRow}>
              <span>Critical</span>
              <div className={styles.statBar}>
                <div
                  className={`${styles.statBarFill} ${styles.criticalBar}`}
                  style={{
                    width: `${
                      ((stats.conditionCounts.critical || 0) /
                        stats.totalPatients) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <span>{stats.conditionCounts.critical || 0}</span>
            </div>
          </div>
        </div>

        <div className={styles.chartContainer}>
          <h3>Patients by Gender</h3>
          <div className={styles.genderStats}>
            <div className={styles.statRow}>
              <span>Male</span>
              <div className={styles.statBar}>
                <div
                  className={`${styles.statBarFill} ${styles.maleBar}`}
                  style={{
                    width: `${
                      ((stats.genderCounts.Male || 0) / stats.totalPatients) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <span>{stats.genderCounts.Male || 0}</span>
            </div>
            <div className={styles.statRow}>
              <span>Female</span>
              <div className={styles.statBar}>
                <div
                  className={`${styles.statBarFill} ${styles.femaleBar}`}
                  style={{
                    width: `${
                      ((stats.genderCounts.Female || 0) / stats.totalPatients) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <span>{stats.genderCounts.Female || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsScreen;
