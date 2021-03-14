import logo from './logo.svg';
import './App.css';
import Weather from './app_component/weather.component';
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';
import Form from './app_component/form.component'; 
const API_key="a755d3740b70d836472e305f92f5ccc4";
class App extends Component{
  constructor(){
    super();
    this.state={
      city:undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false
    };
   
    this.weatherIcon={
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"

    }  
  }
  getWeatherIcon(icons,rangeId){
   switch(true){
     case rangeId>=200 && rangeId<=232:
       this.setState({
          icon:this.weatherIcon.Thunderstorm
       }) 
       break;
       case rangeId>=300 && rangeId<=321:
        this.setState({
           icon:this.weatherIcon.Drizzle
        }) 
        break; 
        case rangeId>=500 && rangeId<=531:
          this.setState({
             icon:this.weatherIcon.Rain
          }) 
          break;
          case rangeId>=600 && rangeId<=622:
            this.setState({
               icon:this.weatherIcon.Snow
            }) 
            break;     
          case rangeId>=701 && rangeId<=781:
             this.setState({
                icon:this.weatherIcon.Atmosphere
             }) 
            break;      
          case rangeId=800:
             this.setState({
                icon:this.weatherIcon.Clear
             }) 
            break;
          case rangeId>=801 && rangeId<=804:
            this.setState({
                icon:this.weatherIcon.Clouds
             }) 
             break;        
        default:
          this.setState({icon:this.weatherIcon.Clouds});
          break;

   }
  }
  calCelsius(temp){
     let cell=Math.floor(temp-273.15);
     return cell;
  }
  getWeather=async(e)=>{
    e.preventDefault();
    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;
    if(city && country)
    {const api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}uk&appid=${API_key}`);
    const response=await api_call.json();
    console.log(response);
    this.setState({
      city:`${response.name} ,`,
      country:response.sys.country,
      // icon:this.weatherIcon.Thunderstorm,
      main:undefined,
      celsius:this.calCelsius(response.main.temp),
      temp_max:this.calCelsius(response.main.temp_max),
      temp_min:this.calCelsius(response.main.temp_min),
      description:response.weather[0].description,
      error:false
    });
    this.getWeatherIcon(this.weatherIcon,response.weather[0].id)
  }
else{
  this .setState({error:true})
}
  };
  render(){
    return(
      <div className="App">
      <Form loadweather={this.getWeather}/>
      <Weather 
      city={this.state.city} 
      country={this.state.country}
      temp_celsius={this.state.celsius}
      temp_min={this.state.temp_min}
      temp_max={this.state.temp_max}
      description={this.state.description}
      weatherIcon={this.state.icon}
      error={this.state.error}
      />
      </div>  
    )
  }
}
export default App;
