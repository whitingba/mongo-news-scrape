var mongoose = require('mongoose');

//Save reference to the Schema constructor
var Schema = mongoose.Schema;

//Create a NoteScehma object
var NoteScehma = new Schema({
    title: String,

    body: String
});

var Note = mongoose.model('Note', NoteScehma);

module.exports = Note;