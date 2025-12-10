// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import styles from "./Form.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Buttons/Button";

import { useURLPosition } from "../../hooks/useURLPosition";

import BackButton from "../Buttons/BackButton";

import Message from "../Message/Message";

import { useCities } from "../../contexts/CitiesContext";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();

  const { createCityAddApi, isLoading } = useCities();

  const [lat, lng] = useURLPosition();

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  const [cityName, setCityName] = useState();

  const [countryName, setCountryName] = useState("");

  const [date, setDate] = useState("");

  const [emoji, setEmoji] = useState("");

  const [notes, setNotes] = useState("");

  const [geocodingError, setGeocodingError] = useState("");

  useEffect(() => {
    const fetchCityData = async () => {
      if (!lat && !lng) return;
      try {
        setGeocodingError("");
        setIsLoadingGeocoding(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) throw new Error("Bele bir erazi yoxdur 🫤 ");
        setCityName(data.city || data.locality || data.principalSubdivision);
        setCountryName(data.countryName);
        setEmoji(data.countryCode ? convertToEmoji(data.countryCode) : "🏳️");
      } catch (error) {
        setGeocodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    };
    fetchCityData();
  }, [lat, lng]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const newCity = {
      cityName,
      country: countryName,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCityAddApi(newCity);
    navigate("/app/cities ");
  };

  if (!lat && !lng)
    return <Message message="Evvelce xeritede her hansi bir erazi secin !!!" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""} `}
      onSubmit={(e) => handlerSubmit(e)}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton onclick={() => navigate(-1)} />
      </div>
    </form>
  );
}
export default Form;
