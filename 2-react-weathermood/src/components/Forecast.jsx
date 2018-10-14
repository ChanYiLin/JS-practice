import React from 'react';
import PropTypes from 'prop-types';

import WeatherDisplay from 'components/WeatherDisplay.jsx';
import WeatherForm from 'components/WeatherForm.jsx';
import WeatherTable from 'components/WeatherTable.jsx';
import {getForecast, cancelForecast} from 'api/open-weather-map.js';

import './weather.css';

export default class Forecast extends React.Component {

    static getInitForecastState(){
        return {
            city: 'na',
            code: -1,
            group: 'na',
            description: 'N/A',
            temp: NaN,
            foreCastObjList: []
        };
    }


    constructor(props) {
        super(props);

        this.state = {
            ...Forecast.getInitForecastState(),
            loading: true,
            masking: true
        };

        // TODO
        this.handleFormQuery = this.handleFormQuery.bind(this);
    }

    componentDidMount() {
        this.getForeCastWeather('Hsinchu', 'metric');
    }
    
    componentWillUnmount() {
        if (this.state.loading) {
            cancelWeather();
        }
    }

    //<h1 className='text-center'>Forecast (unit: {this.props.unit})</h1>
    render() {
        return (
            <div className={`forecast weather-bg ${this.state.group}`}>
                <div className={`mask ${this.state.masking ? 'masking' : ''}`}>
                    <WeatherDisplay unit = {this.props.unit}  {...this.state} />
                    <WeatherTable unit = {this.props.unit} {...this.state} />
                    <WeatherForm city={this.state.city} unit={this.props.unit} onQuery={this.handleFormQuery}/>
                </div>
            </div>
        );
    }

    getForeCastWeather(city, unit){
        this.setState({
            loading: true,
            masking: true,
            city: city
        }, () => {
            getForecast(city, unit).then(weather => {
                let tomorrowData = weather.slice(0,2);
                weather.splice(0,2);
                this.setState({
                    city: city,
                    code: tomorrowData[1].codes,
                    group: tomorrowData[1].group,
                    description: tomorrowData[1].descriptions,
                    temp: tomorrowData[1].temp,
                    foreCastObjList: weather,
                    loading: false
                }, () => this.notifyUnitChange(unit));
            }).catch(err => {
                console.error('Error getting weather', err);

                this.setState({
                    ...Forecast.getInitWeatherState(unit),
                    loading: false
                }, () => this.notifyUnitChange(unit));
            });
        })

        setTimeout(() => {
            this.setState({
                masking: false
            });
        }, 600);
    }

    handleFormQuery(city, unit) {
        this.getForeCastWeather(city, unit);
    }

    notifyUnitChange(unit) {
        if (this.props.unit !== unit) {
            this.props.onUnitChange(unit);
        }
    }

}
