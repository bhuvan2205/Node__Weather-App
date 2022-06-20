const express = require('express');
const path = require('path');
const hbs = require('hbs');

const foreCast = require('./utils/forecast.js');
const geoCode = require('./utils/geoCode.js');


//Initialize the Express js app
const app = express();

//Defaine the path for Express config
const dirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup Handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);

hbs.registerPartials(partialsPath);

//Set the static directory to server
app.use(express.static(dirPath));

//Home page
app.get('', (req, res) => {

    res.render('index', {
        title:"Dynamic Content",
        name: 'Bhuvan_S',
        tech: 'Node js'
    });
});

//About page
app.get('/about', (req, res) => {

    res.render('about', {
        message: "This is message from Node Js dynamically",
        author: 'Node js'
    });
});


app.get('/help', (req, res) => {

    res.render('help', {
        helpText: "Help message",
        title: "Help",
        name: "Bhuvan_S",
        author: 'Node js'
    });
});

app.get('/weather', (req, res) => {

    if(!req.query.address){

        return res.send({
            error: "You must provide address in the Search query.."
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, location} = {})=> {

        if(error){

            return res.send({error })
        }

        foreCast(latitude, longitude, (error, forcastData)=> {

            if(error){
                return res.send({error})
            }

            res.send({

                foreCast: forcastData,
                location,
                address: req.query.address
            })
        })
    })
    
});

app.get('/products', (req, res) => {

    if(!req.query.search){

        res.send({
            error: "you don't provide search query"
        })
    }

    res.send({
        products: []
    })
});


app.get('/help/*', (req, res) => {

    res.render('data', {
        helpText: "This is Weather Applications",
        title: "Help",
    });
});

app.get('*', (req, res) => {

    res.render('error', {
        status: "404",
        message: "The page you are looking for was not found.",
        redirect: "Back to Home"
    });
});

app.listen(3000, ()=> {

    console.log("Server running on port 3000...");
});