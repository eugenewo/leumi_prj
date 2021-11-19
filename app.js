const forecastDataProccess = require('./data-proccess')
const { createCSV, printLog, generateOutput } = require('./utils')


forecastDataProccess(data => {
    const output = generateOutput(data);
    printLog(output);
    createCSV(output);
})