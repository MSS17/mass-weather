import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [buscar, setBuscar] = useState(' ')
  const [ciudades, setCiudades] = useState([])
  
  let location, current, name, region, country, temp_c, wind_kph, wind_dir, humidity, pressure_in, condition, icon, text, tz_id;
  const peticionApi = async (ciudad) => {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${ciudad}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'ee49666199mshddfe0ec3e78793ep11d5aejsn81acd6240afa',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };
    // console.log(newCiudad);
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }

  }
  const buscarCard = ({target}) =>{
    setBuscar(target.value)
  } 
  const generaCard = async (e) => {
    e.preventDefault();
    const nuevoLugar = await peticionApi(buscar)
   
    location = nuevoLugar.location;
    current = nuevoLugar.current;
    console.log(nuevoLugar);
    console.log(location);
    //localizacion
    name = location.name;
    region = location.region;
    country = location.country;
    tz_id = location.tz_id;
    //estado
    temp_c = current.temp_c;
    wind_kph = current.wind_kph;
    wind_dir = current.wind_dir;
    humidity = current.humidity;
    pressure_in = current.pressure_in;
    condition = current.condition;
    //condicion
    icon = `http:${condition.icon}`;
    text = condition.text;
    //generar ciudad
    const nuevaCiudad = {
      name,region,country,temp_c,wind_kph,wind_dir,humidity,pressure_in,icon,text,tz_id
    };    
    setCiudades([nuevaCiudad, ...ciudades]);
    setBuscar('')
  }
  return (
    <>
      <div className="container">
        <header>
          <h1 className='title'>Ejercicio 4 Weather</h1>        
          <input className="input" type="text" value={buscar} onChange={buscarCard}/>
          <button className="btn" onClick={generaCard}>Agregar targeta</button>
        </header>
        <main className="container-header">
          {!ciudades ? 'Cargando... ': ciudades.map( 
            ({name,region,country,temp_c,wind_kph,wind_dir,humidity,pressure_in,icon,text,tz_id}) =>{ 
              return <article className='card' key={tz_id}>
            <div className="card-header">
              <div className="card-header-icon">
                <img src={icon} alt="icon weather api"/>
              </div>
              <div className="card-header-info">
                <p className="card-header-info-condition">{text}</p>
                <p className="card-header-info-temp">{temp_c}<span>°</span></p>
                <p className="card-header-info-city">{name},{region},{country}</p>
              </div>
            </div>
            <div className="card-body">
              <p className="card-body-info-wind">
                Wind: <span>{wind_kph},{wind_dir} km/h</span>
              </p>
              <p className="card-body-info-humidity">
                Pressure: <span>{humidity}%</span>
              </p>
              <p className="card-body-info-pressure">
                Pressure: <span>{pressure_in}%</span>
              </p>
            </div>
          </article>})}
        </main>
        <div>
        </div>
      </div>
    </>
  )
}

export default App
