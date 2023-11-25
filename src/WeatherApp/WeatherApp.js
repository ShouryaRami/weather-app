import React, { Component } from 'react'
import './WeatherApp.css'
import Background from './background.mp4'
import axios from 'axios'
import Search from './search.png'

export class WeatherApp extends Component {
    constructor(props) {
        super(props)
        this.state ={
          value:false,
          id:'',
          feelslike_c:'',
          gust_kph:'',
          humidity:'',
          temp_c:'',
          vis_km:'',
          wind_kph:'',
          localtime:'',
        }
        
    }
    onSearchClick=()=>{
      this.setState({
        value:true
      })
      let apiKey = '887f8d8fbed04628be085053231007';
      let id = this.state.id
      axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${id}&aqi=no`)
      .then((res)=>{
          console.log(res.data)
          let cur = res.data.current
          this.setState({
            feelslike_c: cur.feelslike_c,
            gust_kph: cur.gust_kph,
            humidity:cur.humidity,
            temp_c:cur.temp_c,
            vis_km:cur.vis_km,
            wind_kph:cur.wind_kph,
            localtime:res.data.location.localtime
          })
      }
      )
      .catch((err)=>{
          console.log(err)
      }
      )
    }
    
  render() {
    return (
      <div className='Background'>
        <video src={Background} autoPlay loop muted/>
        <div className='content'>
            <div className='container'>
                <h2 className="card-title">Welcome To weather app</h2>
                <div className='Search-bar'>
                <input onChange={(e)=>{
                    this.setState(
                    {
                    id:e.target.value
                    }
                    )
                    }} type="text" placeholder="Search" className="Input"  id="city"/>
                    <div className='search-icon'>
                      <img src={Search} alt="" onClick={()=>{this.onSearchClick()}}/>
                    </div>
                </div>
                <div>
                  {
                    this.state.value&&
                    (
                      <>
                    <div className='Data-to-show'>
                      <div className='Temp'>
                            {this.state.temp_c}°C
                      </div>
                      <div className='Data-align'>
                        <div className='element'>
                            <div className='font-style'>Feels Like: {this.state.feelslike_c}°C</div>
                            <div className='font-style'>Wind: {this.state.wind_kph}km/h</div>
                        </div>
                        <div className='element'>
                            <div className='font-style'> Huimdity: {this.state.humidity}%</div>
                            <div className='font-style'>Visibility: {this.state.vis_km}km</div>  
                        </div>
                      </div>
                      <div className='localtime'> {this.state.localtime}</div>
                </div>
                      </>
                    )
                  }
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default WeatherApp