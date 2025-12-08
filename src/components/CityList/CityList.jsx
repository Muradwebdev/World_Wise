import styles from "./CityList.module.css";

import { CitiesContexts } from "../../contexts/CitiesContext";
import { useContext } from "react";

import Message from "../Message/Message";
import CityItem from "../CityItem/CityItem";
import Spinner from "../SpinnerLoading/Spinner";

function CityList() {
  const { cities, isLoading } = useContext(CitiesContexts);

  if (isLoading) return <Spinner />;

  if (cities && !cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities?.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
