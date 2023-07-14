import React, {useState} from "react";
import axios from "axios";
import Swal from 'sweetalert2';

function App() {
const[data,setData] = useState({}) 
const[city,setCity] = useState('') 
  

const axiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&{API_Key}` //API Key
  

const searchCity = async (event) => {
  if (event.key === 'Enter') {
    try {
      const response = await axios.get(axiurl); // Assuming "axiurl" is the correct API URL
      setData(response.data);
      console.log(response.data);
      setCity('');
    } catch (error) {
      Swal.fire('Enter a real city');
  
     
    }
  }
};
  return (

    
    <div className="app">
      
      <div className="search">
        <input
        value = {city}
        onChange={event => setCity(event.target.value)}
        
        type ="text"
        placeholder = 'Search City'
        onKeyPress = {searchCity}/>
        
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temperature">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
          {data.weather ? <p>{data.weather[0].main} skies</p> : null}
          
          </div>
        </div>

    {data.name != undefined && //only show when the name is defined
  <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°F</p> : null}
            <p> Feels Like </p>
          </div>
          <div className="humidity">
          {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
          <p>Humidity</p>
         </div>
          <div className="wind">
          {data.wind ? <p className="bold">{data.wind.speed.toFixed()}MPH</p> : null}
          <p>Wind Speed</p>
          </div>
        </div>
}
       
      </div>
    </div>
  );
}

export default App;
