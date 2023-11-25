import React, { Component } from 'react'
import background from './background.mp4'
import './weather.css'
import axios from 'axios'
export class Weather extends Component {
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
      <div className='main'>
        <video src={background} autoPlay loop muted/>
        <div className='content'>
          <div className="card w-96 bg-base-100 shadow-xl image-full">
            <div className="card-body">
              <h2 className="card-title">Welcome To weather app</h2>
              <div>
        <input onChange={(e)=>{
            this.setState(
                {
                  id:e.target.value
                }
            )
        }} type="text" placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs"  id="city"/>
          <button onClick={()=>{this.onSearchClick()}} className="btn btn-outline btn-info">
            Search
          </button>
          <div>
        {
        this.state.value && 
        (
          <>
        Temperature Feels Like= {this.state.feelslike_c}
        <br/>
        Gust = {this.state.gust_kph}
        <br/>
        Huimdity = {this.state.humidity}
        <br/>
        Temperature = {this.state.temp_c}
        <br/>
        Visibility = {this.state.vis_km}
        <br/>
        Wind = {this.state.wind_kph}
        <br/>
        Localtime = {this.state.localtime}
        </>
      ) 
      }
      </div>
      </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Weather