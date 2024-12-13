// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import { useUrlPositions } from "../hooks/useUrlPositions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";


export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`



function Form() {
  const [cityName, setCityName] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [lat, lng] = useUrlPositions();
  const [emoji, setEmoji] = useState();
  const [geocodingError, setGeocodingError] = useState("");
  const {createCity, isLoading} = useCities();

  useEffect(function(){
   

    async function fetchCityData(){
      try{
        setGeocodingError("")
        setIsLoadingGeocoding(true)
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))

        if(!data.countryCode) throw new Error('That\'s doesn\'t seem to be a city. Click somewhere else 😂 ')
      }catch(err){
        setGeocodingError(err.message)
      }finally{
        setIsLoadingGeocoding(false)
      }
    }
    fetchCityData()
  },[lat, lng])

  async function handleSubmit(e){
    e.preventDefault()
    if(!cityName || !date) return

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {lat, lng}
    }
    await createCity(newCity);
    navigate('/app')

  }

  if(isLoadingGeocoding) {
    return <Spinner />
  }

  if(geocodingError){
    return <Message message={geocodingError} />
  }

  if(!lat && !lng){
    return (
       <Message message="Start by clicking somewhere on the map" />
    )
  } 

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={(e) => handleSubmit(e)}>
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
        <DatePicker onChange={(e) => setDate(e)} selected={date} dateFormat='dd/MM/YYYY' id="date" />
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
        <BackButton/>
      </div>
    </form>
  );
}

export default Form;
