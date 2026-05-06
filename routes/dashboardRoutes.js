const express = require('express');
const router = express.Router();
const Sale = require("../models/Sale");
const Stock = require("../models/Stock");

router.get('/admindashboard', async (req, res)=>{
    try {
        let stats = {
            salesRevenue: 0,
            inventoryValue: 0,
        }

        //Calculate total sales revenue
        const salesAgg = await Sale.aggregate(
            [{$group:{_id:null,grandTotal:{$sum:'$total'}}}]
        );
        stats.salesRevenue = salesAgg.length > 0 ? salesAgg[0].grandTotal:0;
         
        //Calculate total inventory value
        const inventoryAgg = await Stock.aggregate(
            [{$group:{_id:null,grandExpenditure:{$sum:'$total'}}}]
        );
        stats.inventoryValue = inventoryAgg.length > 0 ? inventoryAgg[0].grandExpenditure:0;
        res.render('admin', {stats});
    } catch (error) {
      console.log(error.message)
      res.status(400).send('Stats not found')
    }
    
});

router.get('/attendantdashboard', (req, res)=>{
    res.render('salesdashboard')
});

router.get('/storemanagerdashboard', (req, res)=>{
    res.render('managerdashboard')
});

router.get('/deposit', (req, res)=>{
    res.render('deposits')
});

router.post('/deposit', (req, res)=>{
    res.render('deposits')
});

router.get('/receipt', (req, res)=>{
    res.render('receipts')
});

router.post('/receipt', (req, res)=>{
    res.render('receipts')
});

module.exports = router;

