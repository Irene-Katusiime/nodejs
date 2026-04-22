const express = require('express');
const router = express.Router();

//Get index page
router.get('/sales', (req, res)=>{
    res.render('sales')
})

module.exports = router;

// /5.Routes
//Routing
//Structure of a route
// app.method(Path, handler)
// app.get('/hi', (req, res) => { 
//   res.send('Homepage! Hello world.');
// });

// app.get('/about', (req, res) => { 
//   res.send('This is about me');
// });

// app.get('/homepage', (req, res) => { 
//   res.send('This is my homepage');
// });

// app.post('/hobbies',(req ,res)=>{
//   res.send('I like listening to music')
// });

// app.post('/coding',(req ,res)=>{
//   res.send('I like coding')
// });

// app.post('/tech',(req ,res)=>{
//   res.send('My tech journey')
// });

// app.put('/Mood',(req ,res)=>{
//   res.send('I like what i am doing')
// });

// app.delete('/God',(req ,res)=>{
//   res.send('God above all')
// });

// //Path paremeters

// app.get('/students/:firstname',(req ,res)=>{
//   res.send('My first name is ' + req.params.firstname)
// });

// //Query strings/query parameters

// app.get('/dog/:origin',(req ,res)=>{
//   res.send('I am looking for a dog from  ' + req.params.origin + ' which is a ' + req.query.breed + ' and is ' + req.query.color + ' in color')
// });

// app.get('/dog',(req ,res)=>{
//   res.send('I am looking for a dog from  ' + req.query.origin + ' which is a ' + req.query.breed + ' and is ' + req.query.color + ' in color')
// });

// //Serving html files

// // app.get('/',(req ,res)=>{
// //   res.sendFile(__dirname + '/index.html')
// // });

// app.get('/register',(req ,res)=>{
//   res.sendFile(__dirname + '/registration.html')
// });

// app.get('/stock',(req ,res)=>{
//   res.sendFile(__dirname + '/html/stock.html')
// });

// app.post('/stock',(req ,res)=>{
//  console.log(req.body)
// });

// app.get('/',(req ,res)=>{
//   res.sendFile(__dirname + '/html/index.html')
// });

// app.get('/sales',(req ,res)=>{
//   res.sendFile(__dirname + '/html/sales.html')
// });

// app.post('/sales',(req ,res)=>{
//  console.log(req.body)
// });
