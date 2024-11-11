import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { Marker, Popup, MapContainer, TileLayer, useMap, useMapEvent, useMapEvents } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';


const Map = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  
  const mapLng = searchParams.get('lng');
  const mapLat = searchParams.get('lat');
  const [ mapPosition, setMapPosition] = useState([40, 0]);

  useEffect(function(){
    if(mapLat && mapLng) setMapPosition(() => [mapLat, mapLng])
  },[mapLat, mapLng])

  const {cities} = useCities();
  return (
    <div className={styles.mapContainer}>
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
       {
        cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
              <span>lat={city.position.lat}&lng={city.position.lng}</span>
            </Popup>
          </Marker>
        ))
       }
       <ChangeCenter position={mapPosition} />
       <DeleteClick />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({position}){
 const map =  useMap();
  map.setView(position);
  return null;
}

function DeleteClick(){
  const navigate = useNavigate();

  useMapEvents({
    click: e => 
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    

  })
  return null
}

export default Map