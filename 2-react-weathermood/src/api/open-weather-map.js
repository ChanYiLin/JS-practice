import axios from 'axios';

// TODO replace the key with yours
const key = 'e5f3f96febca3047041c227c404c91a1';


export function getWeatherGroup(code) {
    let group = 'na';
    if (200 <= code && code < 300) {
        group = 'thunderstorm';
    } else if (300 <= code && code < 400) {
        group = 'drizzle';
    } else if (500 <= code && code < 600) {
        group = 'rain';
    } else if (600 <= code && code < 700) {
        group = 'snow';
    } else if (700 <= code && code < 800) {
        group = 'atmosphere';
    } else if (800 === code) {
        group = 'clear';
    } else if (801 <= code && code < 900) {
        group = 'clouds';
    }
    return group;
}

export function capitalize(string) {
    return string.replace(/\b\w/g, l => l.toUpperCase());
}

let weatherSource = axios.CancelToken.source();
let forecastSource = axios.CancelToken.source();

export function getWeather(city, unit) {
    const baseUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${key}`;
    var url = `${baseUrl}&q=${encodeURIComponent(city)}&units=${unit}`;

    console.log(`Making request to: ${url}`);

    return axios.get(url, {cancelToken: weatherSource.token}).then(function(res) {
        if (res.data.cod && res.data.message) {
            throw new Error(res.data.message);
        } else {
            return {
                city: capitalize(city),
                code: res.data.weather[0].id,
                group: getWeatherGroup(res.data.weather[0].id),
                description: res.data.weather[0].description,
                temp: res.data.main.temp,
                unit: unit // or 'imperial'
            };
        }
    }).catch(function(err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
}

export function cancelWeather() {
    weatherSource.cancel('Request canceled');
}

export function getForecast(city, unit) {  // 5 days
    const baseUrl = `http://api.openweathermap.org/data/2.5/forecast?appid=${key}`;
    var url = `${baseUrl}&q=${encodeURIComponent(city)}&units=${unit}`;

    console.log(`Making request to: ${url}`);

    return axios.get(url, {cancelToken: forecastSource.token})
                .then(res => {
                    if (res.data.cod != 200){
                        throw new Error(res.data.message);
                    } else {
                        let resultObjList = []
                        let currentDate = new Date();
                        for (let data of res.data.list){
                            
                            let dataDate = new Date(data.dt * 1000);
                            let dataDateHour = dataDate.getHours();

                            if(dataDate.getDay() === currentDate.getDay() || (dataDateHour != 5 && dataDateHour != 20)){
                                continue;
                            }



                            let obj = {}
                            obj.dates = dataDate;
                            obj.codes = data.weather[0].id;
                            obj.group = getWeatherGroup(data.weather[0].id);
                            obj.descriptions = data.weather[0].description;
                            obj.temp  = data.main.temp;
                            console.log(obj.temp);
                            obj.unit  = unit;
                            resultObjList.push(obj);
                        }
                        console.log(resultObjList);
                        return resultObjList;
                    }
                })
                .catch(function(err) {
                    if (axios.isCancel(err)) {
                        console.error(err.message, err);
                    } else {
                        throw err;
                    }
                });
}

export function cancelForecast() {
    forecastSource.cancel('Request canceled');
}
