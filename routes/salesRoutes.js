const express = require("express");
const router = express.Router();
const Sale = require("../models/Sale");
const Stock = require("../models/Stock");

router.get("/sales", async (req, res) => {
  try {
    const items = await Stock.find({ quantity: { $gt: 0 } });
    res.render("sales", { items });
  } catch (error) {
    res.status(500).send("server error");
    console.error("error", error.message);
  }
});

router.post("/sales", async (req, res) => {
  try {
    const { itemId, quantity, unitprice, customername, customercontact } =
      req.body;
      const item = await Stock.findById(itemId)
      if(!item) return res.status(404).send('Item not found')
      if(item.quantity < quantity){
        return res.status(400).send('not enough stock available')
      }  
      //Deduct quantity sold from stock quantity and sav ethe new quantity to the stock collection
      item.quantity -= quantity
      await item.save()

      //Record the sale

    let newItem = new Sale({
      itemname: itemId,
      quantity,
      unitprice,
      customername,
      customercontact,
      attendant: req.user._id
    });
    console.log(newItem)
    await newItem.save();
    res.redirect("/");
  } catch (error) {
    res.render("sales", { error: error.message });
  }
});

module.exports = router;
