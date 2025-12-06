import { Outlet } from "react-router-dom";

import styles from "./Sidebar.module.css";
import React from "react";
import AppNav from "../AppNav/AppNav";
import Logo from "../Logo/Logo";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
