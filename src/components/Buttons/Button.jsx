import styles from "./Button.module.css";
import React from "react";
function Button() {
  return <button className={`${styles.btn} ${styles}`}>children</button>;
}

export default Button;
