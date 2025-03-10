const mongoose = require('mongoose');

const PromoSchema = new mongoose.Schema({
    code: String,
    percent: Number,
    type: {
        type: String,
        enum: ['percentage', 'amount']
    }
}, { timestamps: true });

module.exports = mongoose.model('Promo', PromoSchema);