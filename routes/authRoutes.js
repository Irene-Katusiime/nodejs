const express = require('express');
const router = express.Router();

router.get('/userreg', (req,res)=>{
    res.render('registration')
})

router.post('/userreg', (req,res)=>{
    console.log(req.body)
    res.redirect('/auth/login')
})

router.get('/login', (req,res)=>{
    res.render('login')
})

router.post('/login', (req,res)=>{
    console.log(req.body)
})

module.exports = router;
//Full path in routing
//Full path applies to browser URL, form action in the pug file and redirect in the routes
// /auth/userreg
// /auth/login
