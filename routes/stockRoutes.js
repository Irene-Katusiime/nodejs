const express = require('express');
const router = express.Router();
const multer = require('multer');

const Stock = require('../models/Stock');
const {isAttendant,isAdmin, isManager} = require('../middleware/auth');


//Image configurations
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
let upload = multer({ storage: storage })

router.get('/add-stock',isManager, (req, res)=>{
    res.render('addstock')
})

router.post('/add-stock', upload.single('itemimage'),isManager, async (req ,res)=>{
  try {
    const {itemName,category,quantity,unitPrice,supplierName,transportationCost,sellingprice,itemimage} =req.body;
    const total = quantity*unitPrice
    let newItem = new Stock({
      itemName,
      category,
      quantity,
      unitPrice,
      supplierName,
      transportationCost,
       total,
       sellingprice,
       itemimage: req.file.path
    })
    console.log(newItem)
    await newItem.save();
    res.redirect('/')
  } catch (error) {
    res.render('addstock',{error:error.message})
    console.error(error)
  }
});

//Get stock from the Db
router.get('/stocklist', async(req, res) =>{
  try {
    const stock = await Stock.find()
      .populate('itemName category')
      .sort({date:-1})
       res.render('stock_list', { stocks:stock });
  } catch (error) {
    console.error(error)
    res.status(400).send('Unable to pick stock from the db')
  }
});

//Update stock
router.get('/stock/edit/:id',isManager,async(req,res) =>{
  try {
    const item = await Stock.findById(req.params.id)
    if(!item) return res.status(404).send('Stock not found')
      res.render('stock_edit',{item})
  } catch (error) {
    res.status(400).send('Unable to find stock in the Db')
  }
});

router.post('/stock/edit/:id',isManager, async(req,res) => {
  try {
    const {quantity, sellingprice, unitPrice, supplierName, transportationCost} = req.body;
    const total = quantity*unitPrice;
    await Stock.findByIdAndUpdate(req.params.id,{
      total,
      quantity, 
      sellingprice, 
      supplierName, 
      transportationCost,
      unitPrice
    })
    res.redirect('/stocklist');
  } catch (error) {
    console.error(error.message)
    const stock = await Stock.findById(req.params.id)
     res.render('stock_edit', { item });
  } 
});

//Delete route
router.post('/delete/:id',isManager, async(req,res) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);
    res.redirect('/stocklist')
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;