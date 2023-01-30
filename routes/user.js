const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const User = require('../models/User');
const router = require('express').Router();

// UPDATE USER

router.put("/:id", verifyTokenAndAuth, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password,
            process.env.PASS_SEC).toString()
    }


    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
            { new: true }
        );

        res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
);


//DELETE USER

router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "User has been deleted.", ...deletedUser._doc});
    }
    catch (err) {
        res.status(500).json(err);
    }

});


//FIND USER


router.get("/find/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...params} = user._doc;
        res.status(200).json(params);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL USERS

router.get("/", verifyTokenAndAdmin, async (req,res)=>{
    
    const query = req.query.new;
    
    try{
        const users = query 
        ? await User.find().sort({_id:-1}).limit(1) 
        : await User.find();

        const params = users.map(user =>{
            const {password, ...rest} = user._doc
            return rest;
        });
        res.status(200).json(params);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try{
        const data = await User.aggregate([
            {$match:{
                createdAt: 
                {
                    $gte: lastYear
                }
            }},
            {
                $project:
                {
                    month:
                    {
                        $month: "$createdAt"
                    }
                }
            },
            {
                $group:
                {
                    _id: "$month",
                    total : {$sum: 1}
                }
            }
        ]);

        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err);
    }

});




module.exports = router;