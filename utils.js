const chalk = require('chalk');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

function createCSV(output) {
    const csvWriter = createCsvWriter({
        path: `${path.dirname(require.main.filename)}/openweathermap.csv`,
        header: [
            { id: 'weather_date', title: 'DAY' },
            { id: 'highest_temp_and_city', title: 'city with highest temp' },
            { id: 'lowest_temp_and_city', title: 'city with lowest temp' },
            { id: 'cities_with_rain', title: 'cities with rain' }
        ]
    });

    csvWriter.writeRecords(output)
        .then(() => {
            console.log('...Done writing CSV. Check the project folder for the file');
        });
}


function printLog(output) {

    output.map(item => {

        console.log(chalk.bgBlackBright('W E A T H E R   D A T E  :   ' + chalk.bold(item.weather_date)))
        console.log(chalk.bgBlackBright('H I G H E S T  T E M P  :   ' + chalk.bold(item.highest_temp_and_city)))
        console.log(chalk.bgBlackBright('L O W E S T  T E M P  :   ' + chalk.bold(item.lowest_temp_and_city)))
        console.log(chalk.bgBlackBright('C I T I E S  W I T H  R A I N :' + chalk.bold(item.cities_with_rain)))
        console.log('------------------------------------------------------------------------')
    })
}


function generateOutput(data) {
    let output = [];

    for (let j = 0; j < data[0].dates.length; j++) {

        let highestTemp = { tmp: -100, city: 'some city' };
        let lowestTemp = { tmp: 100, city: 'some city' };
        let cityWithRain = [];
        let date = ''

        for (let k = 0; k < data.length; k++) {

            let currentTemp = +data[k].dates[j].temp

            if (currentTemp > highestTemp.tmp) {
                highestTemp.tmp = currentTemp;
                highestTemp.city = data[k].city
            }

            if (currentTemp < lowestTemp.tmp) {
                lowestTemp.tmp = currentTemp;
                lowestTemp.city = data[k].city
            }

            if (data[k].dates[j].rain)
                cityWithRain.push(data[k].city)

            date = data[k].dates[j].date

            //uncomment to see all data for certain date on all cities
            /* console.log(data[k].city, '-', data[k].dates[j])    */
        }

        output.push({
            "weather_date": date,
            "highest_temp_and_city": highestTemp.tmp + '°C' + ' , ' + highestTemp.city,
            "lowest_temp_and_city": lowestTemp.tmp + '°C' + ' , ' + lowestTemp.city,
            "cities_with_rain": cityWithRain
        })
    }

    return output;
}


module.exports = { createCSV, printLog, generateOutput }