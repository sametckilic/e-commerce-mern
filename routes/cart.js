const { verifyTokenAndAdmin, verifyTokenAndAuth } = require('../middlewares/verifyToken');
const Cart = require("../models/Cart");

const router = require('express').Router();

// create cart

router.post("/", verifyTokenAndAuth, async (req, res) => {

    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }
    catch (err) {
        res.status(500).json(err);
    }

});

//update Cart

router.put("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true });
        res.status(200).json(updatedCart);

    }
    catch (err) {
        res.status(500).json(err);
    }

})

//delete Cart

router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedCart);
    }
    catch (err) {
        res.status(500).json(err);
    }

});

// get Cart

router.get("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        const cart = await Cart.findOne({userId :req.params.id});
        res.status(200).json(cart);
    }
    catch (err) {
        res.status(500).json(err);
    }

});

// get all Cart items (all users)

router.get("/", verifyTokenAndAdmin, async (req, res) => {
   
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;