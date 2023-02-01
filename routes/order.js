const { verifyTokenAndAdmin, verifyTokenAndAuth, verifyToken } = require('../middlewares/verifyToken');
const Order = require("../models/Order");

const router = require('express').Router();

// create Order

router.post("/", verifyToken, async (req, res) => {

    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }
    catch (err) {
        res.status(500).json(err);
    }

});

//update Order

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true });
        res.status(200).json(updatedOrder);

    }
    catch (err) {
        res.status(500).json(err);
    }

})

//delete Order

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedOrder);
    }
    catch (err) {
        res.status(500).json(err);
    }

});

// get Order

router.get("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.id });
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(500).json(err);
    }

});

// get all Order items (all users)

router.get("/", verifyTokenAndAdmin, async (req, res) => {

    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// get monthly income

// router.get("/income", verifyTokenAndAdmin, async (req, res) => {
//     const date = new Date();
//     const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
//     const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

//     try {
//         const income = await Order.aggregate([
//             { $match: { createdAt: { $gte: previousMonth } } },
//             {
//                 $project: {
//                     month: { $month: "$createdAt" },
//                     sales: "$amount",
//                 },
//             },
//             {
//                 $group: {
//                     _id: "$month",
//                     total: { $sum: "$sales" },
//                 },
//             },
//         ]);
//         res.status(200).json(income);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router;