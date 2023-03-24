const express = require('express');
const Notes = require('../models/notes');
const fetchuser = require('../middleware/fetchuser')
const router = express.Router();

//fetch the all notes 
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
  const notes = await Notes.find({user:req.user.id})
  console.log("notes=>",notes)
res.json(notes);
})

// Create a new notes
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