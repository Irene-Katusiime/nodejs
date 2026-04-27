const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");

router.get("/userreg", (req, res) => {
  res.render("registration");
});

router.post("/userreg", async (req, res) => {
  try {
    const { fullname, email, nin, role, password } = req.body;
    //Check if user already exists
    let existingUser = await Registration.findOne({
      email: email.toLowerCase(),
    });
    if (existingUser) {
      return res.render("registration", {
        error: "Email is already registered",
      });
    }
    //Create new user
    const newUser = new Registration({
      fullname,
      email: email.toLowerCase(),
      nin: nin.toUpperCase(),
      role,
      password,
    });
    console.log(newUser);
    await newUser.save();
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.render("registration", { error: error.message });
  }
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", (req, res) => {
  console.log(req.body);
});

module.exports = router;
//Full path in routing
//Full path applies to browser URL, form action in the pug file and redirect in the routes
// /auth/userreg
// /auth/login
