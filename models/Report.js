const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
     partnerId: {
          type: String,
          required: [true, 'Partner ID is required']
     },
     partnerName: {
          type: String,
          default: 'Unknown'
     },
     type: {
          type: String,
          enum: ['debt', 'payment', 'other'],
          required: [true, 'Type is required']
     },
     amount: {
          type: Number,
          required: [true, 'Amount is required'],
          min: [0, 'Amount must be positive']
     },
     currency: {
          type: String,
          enum: ['USD', 'SUM'],
          required: [true, 'Currency is required']
     },
     date: {
          type: Date,
          default: Date.now
     },
     comment: {
          type: String,
          maxlength: [500, 'Comment cannot exceed 500 characters']
     },
     createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
     }
}, {
     timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);