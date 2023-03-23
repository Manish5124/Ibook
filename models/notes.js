// const mongoose = require('mongoose')

// const notesSchema = new mongoose.Schema({
//     title:String,
//     author:String,
//     date:String
// })

// const notes = mongoose.model('notes',notesSchema);

// module.exports = notes;

const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  title: String,
  author: String,
  date: String
});

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;