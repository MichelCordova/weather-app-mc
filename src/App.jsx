import { useEffect, useState } from 'react'
import './App.css'
import  Axios  from 'axios';
import WeatherCard from './components/WeatherCard';

function App() {

  const [coords, setCoords] = useState();

  const [weather, setWeather] = useState();

  const [temp, setTemp] = useState();

  const [isLoading, setIsloading] = useState(true);

  const success = (pos) =>{
    console.log(pos);
    const obj ={
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    }
    setCoords(obj);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, [])
  
  console.log(coords);

  useEffect(() => {
    if(coords){
      const apiKey = 'bba4163de5f8fb5b134ce37281f968c7';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${apiKey}`;
      Axios.get(url)
        .then(res => {
          const cel = (res.data.main.temp - 273.15).toFixed(2);          
          const fah = cel * 9/5 + 32;
          setTemp({cel, fah})
          setWeather(res.data);
        
        })
        .catch(err => console.log(err))
        .finally((setIsloading(false)));
    }
  }, [coords]);
  

  return (
    <div className='app'>
      {
        isLoading ?
          <h2>Loading...</h2>
          :
          <WeatherCard
          weather={weather}
          temp={temp}>
    
          </WeatherCard>
      }
      
    </div>
  )
}

export default App
