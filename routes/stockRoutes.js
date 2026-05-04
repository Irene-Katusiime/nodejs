const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');
const {isAttendant,isAdmin, isManager} = require('../middleware/auth');

router.get('/add-stock',isManager, (req, res)=>{
    res.render('addstock')
})

router.post('/add-stock',isManager, async (req ,res)=>{
  try {
    const {itemName,category,quantity,unitPrice,supplierName,transportationCost,sellingprice} =req.body;
    let newItem = new Stock({
      itemName,
      category,
      quantity,
      unitPrice,
      supplierName,
      transportationCost,
       total,
       sellingprice
    })
    await newItem.save();
    res.redirect('/')
  } catch (error) {
    res.render('addstock',{error:error.message})
  }
});

//Update stock
// router.get('/stock/edit/:id',isManager,async(re,res) =>{
//   try {
//     const item
//   } catch (error) {
    
//   }

// })

module.exports = router;