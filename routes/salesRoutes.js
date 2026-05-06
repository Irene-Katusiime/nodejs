const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");
const Stock = require("../models/Stock");

const {isAttendant,isAdmin, isManager} = require('../middleware/auth');
const { authorizeRoles } = require('../middleware/auth');

router.get("/sales",authorizeRoles("sales attendant", "admin"), async (req, res) => {
  try {
    const items = await Stock.find({ quantity: { $gt: 0 } });
    console.log(items)
    res.render('sales',{items})
  } catch (error) {
    res.status(500).send("server error");
    console.error("error", error.message);
  }
});

router.post("/sales",authorizeRoles("sales attendant", "admin"), async (req, res) => {
  try {
    const { itemId, quantity, unitprice, customername, customercontact } =
      req.body;
    const item = await Stock.findById(itemId);
    if (!item) return res.status(404).send("Item not found");
    if (item.quantity < quantity) {
      return res.status(400).send("not enough stock available");
    }
    //Deduct quantity sold from stock quantity and save the new quantity to the stock collection
    item.quantity -= quantity;
    await item.save();
     const total = quantity*unitprice;

    //Record the sale
    let newItem = new Sale({
      itemname: itemId,
      quantity,
      unitprice,
      customername,
      customercontact,
      attendant: req.user._id,
      total
    });
    console.log(newItem);
    await newItem.save();
    res.redirect("/saleList");
  } catch (error) {
    res.render("sales", { error: error.message });
    console.error(error)
  }
});
//Get sales from the Db
router.get('/salesList', authorizeRoles("sales attendant", "admin"), async(req, res) =>{
  try {
    const sales = await Sale.find()
      .populate('itemname','itemName category')
      .populate('attendant','fullname')
      .sort({date:-1})
       res.render('sales-list',{sales, user:req.user});
  } catch (error) {
    console.error(error)
    res.status(400).send('Unable to pick sales from the db')
  }
});

//Update sale
router.get('/sale/edit/:id',authorizeRoles("sales attendant", "admin"), async(req,res) =>{
  try {
    const sale = await Sale.findById(req.params.id)
    if(!sale) return res.status(404).send('Sale not found')
      res.render('sale_edit',{sale})
  } catch (error) {
      console.log(error)
  //     res.status(400).send('Unable to find sale in the Db')
  }
});
router.post('/sale/edit/:id',authorizeRoles("sales attendant", "store manager"), async(req,res) => {
  try {
    const {quantity, unitprice, customername, customercontact} = req.body;
    const total = quantity*unitprice;
    await Sale.findByIdAndUpdate(req.params.id,{
      total,
      quantity, 
      unitprice, 
      customername, 
      customercontact
    })
    res.redirect('/salesList');
  } catch (error) {
    console.error(error.message)
    const sale = await Sale.findById(req.params.id)
     res.render('sale_edit', { sale });
  } 
});

//Delete route
router.post('/delete/:id',authorizeRoles("sales attendant", "store manager"), async(req,res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.redirect('/salesList')
  } catch (error) {
    console.error(error)
  }
})

module.exports = router;
