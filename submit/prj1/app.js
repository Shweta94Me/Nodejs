const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productDao = require('./productDao.js');

//We will define this later
const sessionHandler = require('./sessionHandler.js');
const apiRouter = require('./apiRouter.js');
const app = express()

//Our API will be listening on port 4000
app.set('port', process.env.PORT || 4000)

//We support JSON request
app.use(bodyParser.json())

//Allow cors everywhere
app.use(cors())

//This will manage our sessions
app.use(sessionHandler)

//Our app have one route to get the products in our database
app.use('/api', apiRouter)

//Launching our server on our app's port
const server = app.listen(app.get('port'), ()=>{
    console.log(`Shopping App is running on port ${app.get('port')}`)
});

module.exports = server