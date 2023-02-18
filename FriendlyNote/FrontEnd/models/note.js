const mongoose = require("mongoose")

const noteSchema = new Schema({
    name: {type: String, required: true},
    dateCreated: {type: Date, required: true},
    dateLastModified: {type: Date}

})

const Note = mongoose.model('noteSchema', noteSchema)
module.exports = Note