import React, { Component } from 'react';
import './App.css';
class StarWarsService extends Component{
  constructor(){
    super();
    this.state = {
      starwarsData : null,
    }
  }

  componentDidMount(){
    const zip = this.props.zip;
    const apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" +
    zip + "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=metric";
    fetch(apiURL)
    .then(res => res.json() )
    .then(json => { this.setState({starwarsData : json}) })
  }
  
  render(){
    const starwarsData = this.state.starwarsData;
    if(!starwarsData) return (<div>Loading data...</div>);
    const weather = starwarsData.weather[0];
    const iconURL = "http://api.openweathermap.org/img/w/" + weather.icon + ".png";
    return(
     // <div>
     // <h1>Hello from OpenWeatherAPI! </h1>
     //<p>Weather for city with zipcode = {this.props.zip}</p>
     //</div>
     <div>
       <h1>
         {weather.main} in {starwarsData.name}
         <img src ={iconURL} alt={starwarsData.description} />
       </h1>
       {/*{JSON.stringify(weatherData)}*/}
       <p>Current temp : {starwarsData.main.temp}</p>
       <p>High temp : {starwarsData.main.temp_max}</p>
       <p>Low temp : {starwarsData.main.temp_min}</p>
       <p>Pressure : {starwarsData.main.pressure} mb</p>
       <p>Humidity : {starwarsData.main.humidity} </p>
       <p>Wind speed : {starwarsData.wind.speed} m/s</p>
       <p>Wind direction : {starwarsData.wind.deg}</p>
       <p></p>
     </div>
    );
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      activePlace : 0,
    }
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
       {/*<p>Hello World from React.js!</p>*/}
       {
         PLACES.map((place,index)=>(
           <button key={index}
           className={"button " + (index%2===0?"is-danger":"is-primary")}
             onClick={()=>{
               this.setState({activePlace : index})
               }}>
             {place.name}
             </button>
         ))}
        <StarWarsService zip={PLACES[activePlace].zip} key={activePlace}/>
      </div>
    );
  }
}
const PLACES = [
  {name:"Moscow",zip:"101000"},
  {name:"New York",zip:"10001"},
  {name:"Seattle",zip:"98101"},
  {name:"San-Francisco",zip:"94102"},
];

export default App;