const request = require('request')
debugger

const getweather = (latitude, longitude, callback) => {
    debugger
    const Url = 'https://api.darksky.net/forecast/8e47b2a06a2cc83e4018aef3aac15f6c/' + latitude + ',' + longitude + '?units=si'
    console.log(Url)
    request({
        url: Url,
        json: true
    }, (error, {body}) => {
        if(error) {
            //error
            callback('Cannot get a connection to the weather service', undefined)
        
        } else if(body) {
             // good response
            //  callback(undefined,'x')
            callback(undefined, {
                temperature: body.currently.temperature,
                rain: body.currently.precipProbability,
                summary: body.hourly.summary
            })
        } else {
            // no valid response
           callback('Cannot get the weather for this location',undefined)
        }
        //return callback
    })
}

module.exports = getweather