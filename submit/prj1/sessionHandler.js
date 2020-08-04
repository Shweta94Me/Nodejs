const { v4: uuidv1} = require('uuid');

//sendUserIdCookie creates a cookie which expires after one day
const sendUserIdCookie = (userId, res) => {
    const oneDayToSeconds = 24 * 60 * 60;
    res.cookie('userId', userId,
    {
        maxAge: oneDayToSeconds,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'? true : false
    });
};

//returns an object with cookies' name as keys
const getAppCookies = (req) => {
    //We extract the raw cookues from the request header
    const rawCookies = req.headers.cookie.split('; ');
    //rawCookie = ['myapp=secretcookie', 'analytics_cookie=beacon;']

    const parsedCookies = {}

    rawCookies.forEach(rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
    return parsedCookies;
}

//returns the value of the userId cookie
const getUserId = (req, res) => getAppCookies(req, res)['userId'];

//Our application store is stateful and uses a variable
const sessions = {};

const sessionHandler = (req, res, next) => {
    //extracting the user id from the session
    let userId = getUserId(req, res);

    //If we don't have a userId or the session manager couldn't recognize the userId
    //then we create a new one
    if(!userId || !sessions[userId]){
        //this should create a time bases unique identifier
        userId = uuidv1();
        sessions[userId] = {
            cart: {}
        };
        //clearing the cookies in case the session userid is not valid
        res.clearCookie('userId');
        //Returning the new assigned cookie value
        sendUserIdCookie(userId, res);
    }
    req.session = sessions[userId];
    //Now in our route handlers you'll have session information in req.session
    next();
};

module.exports = sessionHandler;