const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode.js')
const getweather = require('../utils/getweather.js')

const app = express()

const publicFolder = path.join(__dirname,'../public')
const templatesFolder = path.join(__dirname,'../templates/views')
const partialsFolder = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', templatesFolder)
hbs.registerPartials(partialsFolder)

app.use(express.static(publicFolder))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Your Weather',
        name: 'Doug'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help',
        helpText: 'Help text',
        name: 'Doug'
    })
})

app.get('/weather', (req, res) => {

    const search = req.query.address
    console.log(req.query.address)
    if (search) {

        const geo = geocode(search, (error, { latitude, longitude, location }={}) => {
            if (error) {
                return console.log(error)
            }
            //debugger
            console.log(latitude, longitude, location)
            getweather(latitude, longitude, (error, forecastdata) => {
                if (error) {
                    return console.log(error)
                }
                //console.log(location)
                //console.log(forecastdata)
                res.send({
                    title: 'Weather',
                    today: forecastdata,
                    summary: location
                })
            })

        })
    } else {
        res.send('Please enter a valid address') 
    }
})

app.get('/help/*', (req,res) =>{
    res.send({
        title: 'Help',
        errorMessage: 'Help Article Not Found',
    })
})

app.get('*', (req,res) =>{
    res.send({
        title: 'Result: 404',
        errorMessage: 'Page Not Found',
    })
})

app.listen(3000, () => {
    console.log('server up on 3000')
})