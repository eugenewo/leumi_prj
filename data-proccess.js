const forecast = require('./forecast')

const forecastDataProccess = (callback) => {

    forecast((forecastData) => {

        let data = []

        forecastData.map(cityInfo => {

            let weatherObj = { city: '', dates: [] }
            weatherObj.city = cityInfo.data.city.name

            cityInfo.data.list.map(weatherInfoChunk => {

                let dt = new Date(weatherInfoChunk.dt_txt).toLocaleString('en-UK').substring(0, weatherInfoChunk.dt_txt.toLocaleString('en-UK').indexOf(' '))

                if (weatherObj.dates.length > 0) {

                    if (dt !== weatherObj.dates[weatherObj.dates.length - 1].date) {
                        weatherObj.dates.push({

                            date: new Date(weatherInfoChunk.dt_txt).toLocaleString('en-UK').substring(0, weatherInfoChunk.dt_txt.toLocaleString('en-UK').indexOf(' ')),
                            temp: Math.round(weatherInfoChunk.main.temp),
                            rain: weatherInfoChunk.rain == undefined ? false : true
                        })
                    }
                } else {
                    weatherObj.dates.push({

                        date: new Date(weatherInfoChunk.dt_txt).toLocaleString('en-UK').substring(0, weatherInfoChunk.dt_txt.toLocaleString('en-UK').indexOf(' ')),
                        temp: Math.round(weatherInfoChunk.main.temp),
                        rain: weatherInfoChunk.rain == undefined ? false : true
                    })
                }


            })


            data.push(weatherObj)


        })

        callback(data)
    })

}



module.exports = forecastDataProccess;