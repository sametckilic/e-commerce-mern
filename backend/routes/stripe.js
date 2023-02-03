const router = require('express').router;
const stripe = require('stripe')(process.env.STRIPE_KEY);


router.post("/payment", (req,res)=>{

    stripe.changes.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    });


});

module.exports = router;