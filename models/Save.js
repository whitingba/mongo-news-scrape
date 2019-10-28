let mongoose = require('mongoose');
//Save a reference to the Schema constructor
let Schema = mongoose.Schema;
//Using the Schema constructor, create a new UserSchema object
var SaveSchema = new Schema({
    //add documents - title, link and note
    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }
});

//create our model using the schema above
let Save = mongoose.model("Save", SaveSchema);


//export the Article model to be used
module.exports = Save;