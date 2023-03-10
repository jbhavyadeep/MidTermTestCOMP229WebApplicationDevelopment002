/**
 * File Name: OMP229-F2020-MidTerm-301234500.
 * Name: Bhavyadeep Jagani
 * Student ID: 301234500
 * Web App name: Favorite Book List
*/

// modules required for routing

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        bookList: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  //display details page when clicked on add book button
  res.render('books/details',{title:'Add Contact',books: new book()});


});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

   // add details to database when clicked on submit button
    let newBook = book({
    Title : req.body.title,
    Price : req.body.price,
    Author : req.body.author,
    Genre : req.body.genre
     
  });
 
   book.create(newBook, (err, book) => {
     if (err) {
         console.log(err);
         res.end(err);
     }
     else {
         res.redirect('/books');
     }
 });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
  //find a book in the database using unique id and display it in details page
    let id = req.params.id;
    book.findById(id, (err, book) => {
      if (err) {
        console.log(err);
        res.end(err);
    }
    else{
      res.render('books/details', {
        title: 'Edit Book',
        books: book
      });
    }
    
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
//edit any value of a book in a databse based on unique id and save it after clicking submit button
    let id = req.params.id;
    let updatedbook = book({
      _id: id,
      Title : req.body.title,
      Price : req.body.price,
      Author : req.body.author,
      Genre : req.body.genre
       
    });
  
    book.updateOne({ _id: id }, updatedbook, (err) => {
      if (err) {
          console.log(err);
          res.end(err);
      }
      else {
          res.redirect('/books');
      }
  });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

   
    let id = req.params.id;
    book.remove({_id: id}, (err) => {
    if (err) {
      console.log(err);
      res.end(err);

    } else {
      res.redirect('/books');
    }
  });
});


module.exports = router;
