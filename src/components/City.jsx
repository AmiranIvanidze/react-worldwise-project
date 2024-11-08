import { useParams } from "react-router-dom";
import styles from "./City.module.css";



function City() {
  const {id} = useParams();
  // TEMP DATA
  const currentCity = {
    cityName: "Lisbon",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
  };

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <h1>
      City {id}
    </h1>
  );
}

export default City;
