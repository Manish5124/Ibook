const express = require('express');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Create a new user
router.post('/users',[
  body('name').isLength({ min: 5 }),
  body('email').isEmail(),
  body('age').isLength({ min: 1 }),
]
, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, age } = req.body;

  try {
    const user = new User({ name, email, age });
    console.log("user=>",user);
    
    // let use = await user.findOne({email:email});
    // if(use)
    // {
    //   return res.status(400).json({error:"this email is already exists"})
    // }
    
    await user.save();
    res.send(user);
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