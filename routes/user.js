const express = require('express');
const User = require('../models/user');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Create a new user
router.post('/users',[
  body('name').isLength({ min: 5 }),
  body('email').isEmail(),
  body('password').isLength({ min: 1}),
]
, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

 
  try {
    let { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
     password =await bcrypt.hash(password,salt);
    console.log("pass=>",password);
    const user = await new User({ name, email, password });
    console.log("user=>",user);
    
    // let use = await user.findOne({email:email});
    // if(use)
    // {
    //   return res.status(400).json({error:"this email is already exists"})
    // }
    
    await user.save();
    res.send(password);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Update a user
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;