// require modules
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

// create model class
let userModel = mongoose.Schema({
    username: { type: String, trim: true, required: 'Username is required' },
    // password: { type: String, trim: true, required: 'Password is required' },
    email: { type: String, trim: true, required: 'Email is required' },
    displayName: { type: String, trim: true, required: 'Display Name is required' },
    createdAt: { type: Date, default: Date.Now },
    updatedAt: { type: Date, default: Date.Now }
},
{
    collection: "user"
});

// config options
let options = ({ missingPasspordError: 'Incorrect / Missing Password' });
userModel.plugin(passportLocalMongoose, options);

module.exports.user = mongoose.model('user', userModel);