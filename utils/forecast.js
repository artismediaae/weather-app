const request = require("postman-request")

const ApiKey = "87b6b6b90582c13db27984d4deb3185a"

const forecast = (lattitude, longitude, callback) =>{ 
    const url = `http://api.weatherstack.com/forecast?access_key=${ApiKey}&query=${lattitude},${longitude}`
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather service.", undefined)
        } else if (response.body.error) {
            callback(`Unable to find location. Error: ${response.body.error.info}`, undefined)
        } else {
            const current = response.body.current
            const locationData = response.body.location
            callback(undefined, {
                temperature: current.temperature,
                feelslike: current.feelslike,
                observation_time: current.observation_time,
                weather_descriptions: current.weather_descriptions,
                humidity: current.humidity,
                wind_speed: current.wind_speed,
                wind_dir: current.wind_dir,
                lat: locationData.lat,
                lon: locationData.lon
            })
        }
    })
}

module.exports = forecast // Export the forecast function