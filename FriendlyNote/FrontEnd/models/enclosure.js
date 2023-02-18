const mongoose = require("mongoose")

const enclosureSchema = new Schema({
    name: {type: String, required: true},
    notes: [{type: ObjectId, ref: 'Note'}],
    creator: {type: String, required: true},
    possesedBy: [{type: String}],
    canModify:[{type: String}]
})

const Enclosure = mongoose.model('enclosureSchema', enclosureSchema)
module.exports = Enclosure
