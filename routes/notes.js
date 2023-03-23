// const express = require('express')
// const notes = require('../models/notes')

// const router = express.Router();

// // create new 
// router.post('/notes',async (req,res)=>{
//     const {title,author,date} = req.body;

//     try{
//         const notes = new notes({title,author,date});
//         await notes.save();
//         res.send(notes)
//     }
//     catch(error)
//     {
//         console.log(error);
//         res.status(500).send(error);
//     }

// });

// module.exports = router;


const express = require('express');
const Notes = require('../models/notes');

const router = express.Router();

// Create a new user
router.post('/notes', async (req, res) => {
  const { title,author,date } = req.body;

  try {
    const notes = new Notes({ title,author,date});
    await notes.save();
    res.send(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Get all users
// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// });

// Update a user
// router.put('/users/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, email, age } = req.body;

//   try {
//     const user = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
//     res.send(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// });

// Delete a user
// router.delete('/users/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findByIdAndDelete(id);
//     res.send(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// });

module.exports = router;