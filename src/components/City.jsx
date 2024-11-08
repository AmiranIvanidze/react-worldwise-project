import { useParams, useSearchParams } from "react-router-dom";
import styles from "./City.module.css";



function City() {
  const {id} = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const lng = searchParams.get('lng');
  const lat = searchParams.get('lat');
  
  const currentCity = {
    cityName: "Lisbon",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
  };

  const { cityName, emoji, date, notes } = currentCity;
  
  return (
   <>
    <h1>
      City {id}
    </h1>
    <p>Position: {lat}, {lng}</p>
   </>
  );
}

export default City;
