import React from "react";
import styles from "./Sidebar.module.css";

function Sidebar({ onNavigate, currentPage }) {
  return (
    <div className={styles.sidebar}>
      <h1 className={styles.sidebarTitle}>Hospital Management</h1>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a
              href="#"
              className={
                currentPage === "patients"
                  ? styles.navLinkActive
                  : styles.navLink
              }
              onClick={(e) => {
                e.preventDefault();
                onNavigate("patients");
              }}
            >
              Patients
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              href="#"
              className={
                currentPage === "stats" ? styles.navLinkActive : styles.navLink
              }
              onClick={(e) => {
                e.preventDefault();
                onNavigate("stats");
              }}
            >
              Stats
            </a>
          </li>
          {/* <li className={styles.navItem}><a href="#" className={styles.navLink}>Appointments</a></li>
          <li className={styles.navItem}><a href="#" className={styles.navLink}>Rooms</a></li>
          <li className={styles.navItem}><a href="#" className={styles.navLink}>Staff</a></li> */}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
