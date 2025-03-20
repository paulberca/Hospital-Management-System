import React from 'react';
import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h1 className={styles.sidebarTitle}>Hospital Management</h1>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}><a href="#" className={styles.navLinkActive}>Patients</a></li>
          <li className={styles.navItem}><a href="#" className={styles.navLink}>Doctors</a></li>
          <li className={styles.navItem}><a href="#" className={styles.navLink}>Appointments</a></li>
          <li className={styles.navItem}><a href="#" className={styles.navLink}>Rooms</a></li>
          <li className={styles.navItem}><a href="#" className={styles.navLink}>Staff</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
