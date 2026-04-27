const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

router.get('/add-stock', (req, res)=>{
    res.render('addstock')
})

router.post('/add-stock', async (req ,res)=>{
  try {
    const {itemName,category,quantity,unitPrice,supplierName,transportationCost} =req.body;
    const total = parseInt(quantity)*parseFloat(unitPrice);
    let newItem = new Stock({
      itemName,
      category,
      quantity,
      unitPrice,
      supplierName,
      transportationCost,
       total
    })
    await newItem.save();
    res.redirect('/')
  } catch (error) {
    res.render('addstock',{error:error.message})
  }
});

module.exports = router;