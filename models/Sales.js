const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  itemname: {
    type: String
  },
  quantity: {
    type: Number,
    trim: true
  },
  unitprice: {
    type: Number,
    trim: true
  },
  customername: {
    type: String
  },
  customercontact: {
    type: Number,
    trim: true
  }
});

module.exports = mongoose.model('Sales', salesSchema);