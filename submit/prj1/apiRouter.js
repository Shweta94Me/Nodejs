const express = require('express')
const router = express.Router();

//Our app has one route to get the products in our database
router.get('/product/all', (req, res) =>{
    //This array simulates our database
    const allProducts = [
        {name : 'blue cheese', type:'cheese'},
        {name : 'brocolli', type: 'vegetable'},
        {name : 'cookie', type : 'snack'}
    ];
    res.status(200).send(allProducts);
})

//add item to the cart
router.post('/cart', (req, res) => {
    const cart = req.session.cart;
    const productName = req.body.productName;
    //Fancy stupid trick to do create a key with the value 1
    //or if the key exist increment the value by 1
    cart[productName] = -~ cart[productName];
    return res.status(200).send('success');
});

//get all items in the shopping cart
router.get('/cart', (req, res) => {
    //Returns the value of the cart
    const cart = req.session.cart;
    res.status(200).send(cart);
})

//Allows our user to checkout
router.post('/checkout', (req, res) => {
    //we want to clear the cookies
    res.clearCookie('userId');
});

module.exports = router;