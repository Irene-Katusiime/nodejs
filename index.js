 //1.Dependencies
 const express = require('express');
 const expressSession = require('express-session')
 const path  = require('path')

 //2.Instantiations
const app = express();
const port = 3000;

//3.Configurations
//Set templating engine to pug
app.set("view engine","pug");
app.set("views", path.join(__dirname, "views"))


//4.Middleware
// Simple request time logger
// app.use((req, res, next) => {
//    console.log("A new request received at " + Date.now());

//    // This function call tells that more processing is
//    // required for the current request and is in the next middleware
//    //function route handler.
//    next();  
// });
app.use(express.urlencoded({ extended: false }));
app.use(expressSession({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
}))

//Important line for static files
app.use(express.static(path.join(__dirname,'public')));


//Simple request time logger for a specific route
app.use('/hobbies', (req, res, next) => {
  console.log('A new request received at ' + Date.now());
  next();
});


//5.Routes
//Routing
//Structure of a route
// app.method(Path, handler)
app.get('/hi', (req, res) => { 
  res.send('Homepage! Hello world.');
});

app.get('/about', (req, res) => { 
  res.send('This is about me');
});

app.get('/homepage', (req, res) => { 
  res.send('This is my homepage');
});

app.post('/hobbies',(req ,res)=>{
  res.send('I like listening to music')
});

app.post('/coding',(req ,res)=>{
  res.send('I like coding')
});

app.post('/tech',(req ,res)=>{
  res.send('My tech journey')
});

app.put('/Mood',(req ,res)=>{
  res.send('I like what i am doing')
});

app.delete('/God',(req ,res)=>{
  res.send('God above all')
});

//Path paremeters

app.get('/students/:firstname',(req ,res)=>{
  res.send('My first name is ' + req.params.firstname)
});

//Query strings/query parameters

app.get('/dog/:origin',(req ,res)=>{
  res.send('I am looking for a dog from  ' + req.params.origin + ' which is a ' + req.query.breed + ' and is ' + req.query.color + ' in color')
});

app.get('/dog',(req ,res)=>{
  res.send('I am looking for a dog from  ' + req.query.origin + ' which is a ' + req.query.breed + ' and is ' + req.query.color + ' in color')
});

//Serving html files

// app.get('/',(req ,res)=>{
//   res.sendFile(__dirname + '/index.html')
// });

app.get('/register',(req ,res)=>{
  res.sendFile(__dirname + '/registration.html')
});

app.get('/stock',(req ,res)=>{
  res.sendFile(__dirname + '/html/stock.html')
});

app.post('/stock',(req ,res)=>{
 console.log(req.body)
});

app.get('/',(req ,res)=>{
  res.sendFile(__dirname + '/html/index.html')
});

app.get('/sales',(req ,res)=>{
  res.sendFile(__dirname + '/html/sales.html')
});

app.post('/sales',(req ,res)=>{
 console.log(req.body)
});




//This is the second last chunk of code
//Handling non-existing routes
app.use((req,res) =>{
  res.status(404).send('Oops!Route not found.');
});

//6.Bootstrapping Server
//Last line of code in this file
app.listen(port, () => console.log(`listening on port ${port}`));

