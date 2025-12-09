import { NavLink } from "react-router-dom";
import styles from "../AppNav/AppNav.module.css";
// 6VOJwN660AqRmtFN

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
