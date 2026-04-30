const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  itemname: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stock',
    required: true
  },
  quantity: {
    type: Number,
    trim: true,
    required: true
  },
  unitprice: {
    type: Number,
    trim: true,
    required: true
  },
  customername: {
    type: String,
    required: true
  },
  customercontact: {
    type: Number,
    trim: true,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  total: {
    type: Number
  },
  attendant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration'
  }
});

module.exports = mongoose.model('Sale', saleSchema);