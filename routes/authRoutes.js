const express = require("express");
const router = express.Router();
const passport = require('passport');

//Importing a model
const Registration = require("../models/Registration");

router.get("/signupform", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  try {
    const { fullname, email, nin, role, password, phonenumber } = req.body;
    //Check if user already exists
    let existingUser = await Registration.findOne({
      email: email.toLowerCase(),
    });
    if (existingUser) {
      return res.render("signup", {
        error: "Email is already registered",
      });
    }
    //Create new user
    const newUser = new Registration({
      fullname,
      email: email.toLowerCase(),
      nin: nin.toUpperCase(),
      role,
      phonenumber
    });
    console.log(newUser);
    await Registration.register(newUser,req.body.password, (err)=>{
      if(err){
        return res.redirect('/signup')
      }
    })
     res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.render("signup", { error: error.message });
  }
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login",passport.authenticate('local',{failureRedirect:'/login'}), (req, res) => {
  if(req.user.role==='admin'){
    res.redirect('/admindashboard')
  }else if(req.user.role ==='sales attendant'){
    res.redirect('/attendantdashboard')
  }else if(req.user.role ==='store manager'){
    res.redirect('/storemanagerdashboard')
  }else{
    res.redirect('/')
  }
});

//Logout route
router.get('/logout',(req,res,next)=>{
  req.logout( (err)=>{
    if(err){
      return next(err);
    }
    res.redirect('/')
  })
})

module.exports = router;

//Full path in routing
//Full path applies to browser URL, form action in the pug file and redirect in the routes
// /auth/userreg
// /auth/login
