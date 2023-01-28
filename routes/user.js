const { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin } = require('./verifyToken');
const User = require('../models/User');
const router = require('express').Router();

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


router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted.", deletedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }

});

router.get("/:id", verifyTokenAndAdmin, async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
});





module.exports = router;