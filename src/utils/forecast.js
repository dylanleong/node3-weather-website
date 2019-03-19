const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/897231c15c8207ee1f014463917ed378/' + latitude + ',' + longitude + '?units=si&lang=en'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            // Create a new JavaScript Date object based on the timestamp
            // multiplied by 1000 so that the argument is in milliseconds, not seconds.
            var date = new Date(body.daily.data[0].temperatureHighTime * 1000);
            // Hours part from the timestamp
            var hours = date.getHours();
            // Minutes part from the timestamp
            var minutes = "0" + date.getMinutes();
            // Seconds part from the timestamp
            var seconds = "0" + date.getSeconds();

            // Will display time in 10:30:23 format
            var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

            const today = new Date();

            callback(undefined,
                body.daily.data[0].summary + 'It is currently ' + body.currently.temperature +
                ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain. The temperature will it it\'s peak of ' +
                body.daily.data[0].temperatureHigh + ' degrees at around ' + formattedTime + '.'
            )
        }
    })

}

module.exports = forecast