const config = require('./env.json')
const axios = require('axios').default;


const forecast = (callback) => {
    const weatherRequests = []
    config.CITIES.map(city => { weatherRequests.push(axios.get(`${config.WEATHER_URI}?q=${city}&units=metric&appid=${config.API_KEY}`)) })
    axios.all(weatherRequests)
        .then(function(response) {
            callback(response)
        })
        .catch((err) => {
            console.log('FAIL', err)
        });

}

module.exports = forecast;