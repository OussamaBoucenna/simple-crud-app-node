const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config();

// intialize db paramaters
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const cluster = process.env.DB_CLUSTER;
const dbname = process.env.DB_NAME;

// link to mongoDb data base 
const uri = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority&appName=${dbname}`;

const productRoute = require('./routes/product.route.js')

// middleware 
// allow json file to express js
app.use(express.json())

//routes 
app.use("/api/products", productRoute)


app.get('/', (req, res) => {
    console.log('the user hit the server')
    res.send('Home page  found ')
})










// connecting to db
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to database!')
        app.listen(5000, () => {
            console.log('the server is listening on port 5000...')
        })
    })
    .catch((err) => {
        console.log('Connection failed!')
        console.log(err)
    })