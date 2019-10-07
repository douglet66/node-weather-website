const request = require('request')

const geocode = (address, callback) => {
    const Url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZG91Z2xldDY2IiwiYSI6ImNrMWFrbHMyeTAwdW0zY3A0OTB5NGNrNmQifQ.pqLYKD8Ivk-lEuubsmxy1A&limit=1'
    request({
        url: Url,
        json: true
    }, (error, {body}) => {
        if (error) {
            // error
            callback('Unable to connect to location services', undefined)
        } else if (body.features[0].length === 0) {
            // no valid response
            callback('Unable to find location. Try another search', undefined)
        } else {
            // good response
            console.log(body.features[0].center[1])
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
        //return callback
    })

}

module.exports = geocode