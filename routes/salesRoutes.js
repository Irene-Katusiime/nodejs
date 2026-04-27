const express = require('express');
const router = express.Router();

//Get index page
router.get('/sales', (req, res)=>{
    res.render('sales')
})

router.post('/sales', async (req, res)=>{
        console.log(req.body)
    });
// console.log(req.body)
// });

module.exports = router;


