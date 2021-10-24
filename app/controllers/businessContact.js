let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let BusinessContact = require('../models/businessContact');

module.exports.businessContactDisplay = (req, res, next) => {
  BusinessContact.find((err, businessContactList) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('businessContact/list',
        {
          title: 'Business Contact',
          BusinessContactList: businessContactList,
          displayName: req.user ? req.user.displayName : ''
        });
    }
  }).sort( { "contactName" : 1 });
}

module.exports.businessContactEdit = (req, res, next) => {
  let id = req.params.id;

  BusinessContact.findById(id, (err, contactToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      //show the edit view
      res.render('businessContact/edit', {
        title: 'Edit Contact', businessContact: contactToEdit,
        displayName: req.user ? req.user.displayName : ''
      })
    }
  });
}

module.exports.businessContactEditProcess = (req, res, next) => {
  let id = req.params.id;

  let updatedContact = BusinessContact({
    "_id": id,
    "contactName": req.body.contactName,
    "contactNumber": req.body.contactNumber,
    "email": req.body.email,
  });

  BusinessContact.updateOne({ _id: id }, updatedContact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      // refresh the book list
      res.redirect('/business-contact');
    }
  });
}


module.exports.businessContactDelete = (req, res, next) => {
  let id = req.params.id;

  BusinessContact.deleteOne({_id: id}, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
           // refresh the business contact page
           res.redirect('/business-contact');
      }
  });
}