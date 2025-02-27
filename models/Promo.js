const mongoose = require('mongoose');

const PromoSchema = new mongoose.Schema({
    code: String,
    percent: Number,
}, { timestamps: true });

module.exports = mongoose.model('Promo', PromoSchema);