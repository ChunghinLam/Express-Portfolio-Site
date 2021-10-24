let mongoose = require('mongoose');

// create a model class
let businessContactModel = mongoose.Schema({
    contactName: String,
    contactNumber: String,
    email: String
},
{
    collection: "business_contact"
});

module.exports = mongoose.model('BusinessContact', businessContactModel);