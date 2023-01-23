const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        desc: {type: String, required: true, unique: true},
        img:{type: String, required: true},
        categories:{type: Array},
        size:{type: String, required: true},
        color:{type: String, required: true},
        price:{type: Number, required: true},


    },
    {timestamps: true}
);



module.exports = mongoose.model("Product", productSchema);

