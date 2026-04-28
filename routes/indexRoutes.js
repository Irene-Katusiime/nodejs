const express = require('express');
const router = express.Router();

//Get index page
router.get('/', (req,res)=>{
    res.render('index')
});



// app.post('/signup',(req ,res)=>{
//   console.log(req.body)
// });

module.exports = router;

