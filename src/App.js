import React, {Component} from 'react';
import Titles from './Components/Titles';
import Form from './Components/Form';
import Weather from './Components/Weather';


const API_KEY = '5f87c090b8390cec6528d76a998d3974';

class App extends Component {

  state = {
    humidity: undefined,
    temp: undefined,
    description: undefined,
    city: undefined,
    country: undefined,
    error: undefined
  };


  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}`);
    console.log(api_call)
    const data = await api_call.json();
    if (city && country) {

      if (data.cod === 404) {
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          error: "city not found"
        })
      } else {
        this.setState({
          temp: data.list[0].main.temp,
          city: data.city.name,
          country: data.city.country,
          humidity: data.list[0].main.humidity,
          description: data.list[0].weather[0].description,
          error: ""
        });
      }


    } else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the value"
      });

    }
  }

  render() {
    return ( < div className = "wrapper" >
      < div className = "main" >
      < div className = "container" >
      < div className = "row" >
      < div className = "col-sm-5 title-container" >
      < Titles / >
      
      </div> 
      < div className = "col-sm-7 form-container" >
      
      < Form getWeather = {
        this.getWeather
      }
      /> <      Weather temp = {
        this.state.temp
      }
      city = {
        this.state.city
      }
      country = {
        this.state.country
      }
      humidity = {
        this.state.humidity
      }
      description = {
        this.state.description
      }
      error = {
        this.state.error
      }
      /> </div> </div> </div> </div> </div>
    );
  }
}

export default App;
