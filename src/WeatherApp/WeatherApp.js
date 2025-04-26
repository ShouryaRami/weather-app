import React, { Component } from 'react'
import './WeatherApp.css'
import Background from './background.mp4'
import axios from 'axios'
import Search from './search.png'

export class WeatherApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
          value: false,
          id: '',
          feelslike_c: '',
          gust_kph: '',
          humidity: '',
          temp_c: '',
          vis_km: '',
          wind_kph: '',
          localtime: '',
          condition: '',
          is_sunny: false,
          error: null
        }
        this.inputRef = React.createRef();
    }
    
    onSearchClick = () => {
      const searchValue = this.inputRef.current.value;
      
      this.setState({
        value: true,
        error: null,
        id: searchValue
      })
      
      let apiKey = '887f8d8fbed04628be085053231007';
      axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchValue}&aqi=no`)
      .then((res) => {
          console.log(res.data)
          let cur = res.data.current
          this.setState({
            feelslike_c: cur.feelslike_c,
            gust_kph: cur.gust_kph,
            humidity: cur.humidity,
            temp_c: cur.temp_c,
            vis_km: cur.vis_km,
            wind_kph: cur.wind_kph,
            localtime: res.data.location.localtime,
            condition: cur.condition.text,
            is_sunny: cur.condition.text.toLowerCase().includes('sunny'),
            error: null
          })
      })
      .catch((err) => {
          console.log(err)
          this.setState({
            error: "Invalid city name. Please try again.",
            value: false
          })
      })
    }
    
    render() {
        return (
            <div className='Background'>
                <video src={Background} autoPlay loop muted/>
                <div className='content'>
                    <div className='container'>
                        <h2 className="card-title">Welcome To weather app</h2>
                        <div className='Search-bar'>
                            <input 
                                ref={this.inputRef}
                                type="text" 
                                placeholder="Search" 
                                className="Input"  
                                id="city"
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        this.onSearchClick();
                                    }
                                }}
                            />
                            <div className='search-icon'>
                                <img src={Search} alt="" onClick={this.onSearchClick}/>
                            </div>
                        </div>
                        <div>
                            {this.state.error && (
                                <div className="error-message">
                                    {this.state.error}
                                </div>
                            )}
                            {this.state.value && !this.state.error && (
                                <>
                                    <div className='Data-to-show'>
                                        <div className='weather-summary'>
                                            <div className='font-style'>Today's weather in {this.state.id}: {this.state.condition}</div>
                                            <div className='font-style'>Is it sunny in {this.state.id}? {this.state.is_sunny ? 'Yes' : 'No'}</div>
                                        </div>
                                        <div className='Temp'>
                                            {this.state.temp_c}°C
                                        </div>
                                        <div className='Data-align'>
                                            <div className='element'>
                                                <div className='font-style'>Feels Like: {this.state.feelslike_c}°C</div>
                                                <div className='font-style'>Wind: {this.state.wind_kph}km/h</div>
                                            </div>
                                            <div className='element'>
                                                <div className='font-style'>Humidity: {this.state.humidity}%</div>
                                                <div className='font-style'>Visibility: {this.state.vis_km}km</div>  
                                            </div>
                                        </div>
                                        <div className='localtime'>{this.state.localtime}</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherApp