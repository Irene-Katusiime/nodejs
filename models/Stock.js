const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  itemName: {
    type: String
  },
  category: {
    type: String
  },
  quantity: {
    type: Number,
    trim: true
  },
  unitPrice: {
    type: Number,
    trim: true
  },
  supplierName: {
    type: String
  },
 transportationCost: {
    type: Number,
    trim: true
  },
  dateReceived: {
    type: Date,
    default: Date.now
  },
  total: {
    type: Number
  },
  sellingprice: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Stock', stockSchema);