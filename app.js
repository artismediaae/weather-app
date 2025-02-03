const request = require("postman-request")
const forecast = require('./utils/forecast')
const readline = require('readline')


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const ApiKey = "87b6b6b90582c13db27984d4deb3185a"



/*
rl.question('Enter a city: ', (location) => {
    const url = `http://api.weatherstack.com/forecast?access_key=${ApiKey}&query=${location}`
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            console.log("Unable to connect to weather service.")
        } else if (response.body.error) {
            console.log(`Unable to find location. Error: ${response.body.error.info}`)
        } else {
            const current = response.body.current
            const locationData = response.body.location
            console.log(`It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out at ${current.observation_time}.`)
            console.log(`The weather is ${current.weather_descriptions[0].toLowerCase()} with a humidity of ${current.humidity}%. The wind is blowing at ${current.wind_speed} km/h from the ${current.wind_dir}.`)
            console.log(`The location is at latitude ${locationData.lat} and longitude ${locationData.lon}.`)
        }
        rl.close()
    })
})
*/

// Future use: Mapbox API integration

const mapboxApiKey = "pk.eyJ1IjoiYXJ0aXNtZWRpYWUiLCJhIjoiY202ZHoyeGJsMTFkbDJqcXp0czNmdHYyaiJ9.qMifiK_o4QLryFzBLM7iKg"

rl.question('Enter a city: ', (location) => {
    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?types=address&access_token=${mapboxApiKey}&limit=1`
    console.log(`Mapbox URL: ${mapboxUrl}`) // Log the URL for debugging
    request({ url: mapboxUrl, json: true }, (error, response) => {
        if (error) {
            console.log("Unable to connect to location service.")
        } else if (!response.body.features || response.body.features.length === 0) {
            console.log("Unable to find location.")
        } else {
            console.log("Mapbox API response:", response.body) // Log the raw response for debugging
            const coordinates = response.body.features[0].center
            const lattitude = coordinates[1]
            const longitude = coordinates[0]

            forecast(lattitude, longitude, (error, data) => {
                console.log('Error:', error)
                console.log('Forecast data:', data)
            })
        }
        rl.close()
    })
})




    
    // request({ url: mapboxUrl, json: true }, (error, response) => {
    //     if (error) {
    //         console.log("Unable to connect to location service.")
    //     } else if (!response.body.features || response.body.features.length === 0) {
    //         console.log("Unable to find location.")
    //     } else {
    //         console.log("Mapbox API response:", response.body) // Log the raw response for debugging
    //         const coordinates = response.body.features[0].center
    //         const latitude = coordinates[1]
    //         const longitude = coordinates[0]
    //         const weatherstackUrl = `http://api.weatherstack.com/forecast?access_key=${ApiKey}&query=${latitude},${longitude}`
    //         console.log(`Weatherstack URL: ${weatherstackUrl}`) // Log the URL for debugging
    //         request({ url: weatherstackUrl, json: true }, (error, response) => {
    //             if (error) {
    //                 console.log("Unable to connect to weather service.")
    //             } else if (response.body.error) {
    //                 console.log(`Unable to find location. Error: ${response.body.error.info}`)
    //             } else {
    //                 console.log("Weatherstack API response:", response.body) // Log the raw response for debugging
    //                 const current = response.body.current
    //                 const tomorrow = response.body.forecast[Object.keys(response.body.forecast)[1]]
    //                 console.log(`It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out at ${current.observation_time}.`)
    //                 console.log(`The weather is ${current.weather_descriptions[0].toLowerCase()} with a humidity of ${current.humidity}%. The wind is blowing at ${current.wind_speed} km/h from the ${current.wind_dir}.`)
    //                 console.log(`There is a ${current.precip}% chance of rain.`)
    //                 console.log(`The location is at latitude ${latitude} and longitude ${longitude}.`)
    //                 // console.log(`Tomorrow's forecast: ${tomorrow.weather_descriptions[0].toLowerCase()} with a high of ${tomorrow.maxtemp} degrees and a low of ${tomorrow.mintemp} degrees. The wind will be blowing at ${tomorrow.wind_speed} km/h from the ${tomorrow.wind_dir}. There is a ${tomorrow.precip}% chance of rain.`)
    //             }
    //             rl.close()
    //         })
    //     }
    // })
