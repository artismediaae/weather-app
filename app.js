const request = require("postman-request")
const forecast = require('./utils/forecast')
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

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
                if (error) {
                    console.log('Error:', error)
                } else {
                    console.log(`It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out at ${data.observation_time}.`)
                    console.log(`The weather is ${data.weather_descriptions[0].toLowerCase()} with a humidity of ${data.humidity}%. The wind is blowing at ${data.wind_speed} km/h from the ${data.wind_dir}.`)
                    console.log(`The location is at latitude ${data.lat} and longitude ${data.lon}.`)
                }
            })
        }
        rl.close()
    })
})
