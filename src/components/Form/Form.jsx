// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import styles from "./Form.module.css";

import { useNavigate } from "react-router-dom";

import Button from "../Buttons/Button";

function Form() {
  const navigate = useNavigate();
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input id="cityName" />
        <span className={styles.flag}>emoji</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to ?</label>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to </label>
        <textarea id="notes" />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
