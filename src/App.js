import React from 'react';
import './index.css';
import Weather from './weather1/weather';
import WeatherApp from './WeatherApp/WeatherApp';

class App extends React.Component{
  render(){
    return(
      <div>
        {/* <Weather/> */}
        <WeatherApp/>
    </div>
    )
  }
}
export default App