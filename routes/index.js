
const { serviceThatCallsApi } = require('../services/UserServices');
const mongoose = require('mongoose');

module.exports = function(app) {

  //starter kit starts
    // app.get('/', (req, res) => {
    //   var commonHeaders = {'Content-Type': 'text/html'};
    //     res.send('Welcome to OSF Academy Backend Starter Kit. Have Fun!')
    // });
    
    app.use('/users', require('./UserRoutes'));
    // You can add others app.use with other route files
    
    app.get('/services/UserServices', async (req, res) => {
      const data = await serviceThatCallsApi('categories/?');
      res.status(200).send(data);
    })
  

  serviceThatCallsApi('categories/?')
    .then(data => {
      //console.log(data);
      const html = data
        .map(category => {
          let categIds = category.id;
          return categIds
        })
      //console.log(html);
          for (let i = 0; i<html.length; i++){
            let iterate = html[i];
            let pageNumber = '';
            //api links for all array
            app.get(`/services/${pageNumber}${iterate}`, async (req, res) => {
              const data = await serviceThatCallsApi(`products/product_search?${pageNumber}primary_category_id=${iterate}&`);
              res.status(200).send(data);
            })
            //console.log(iterate);
          } 
    }) 
    .catch(error => {
        console.log(error);
    });        

  //console.log(catNameHolder);
  //console.log(test());
 
    
  //GOOD - Working
  // app.get('/services/womens-clothing-tops', async (req, res) => {
  //   const data = await serviceThatCallsApi('products/product_search?page=2primary_category_id=womens-clothing-tops&');
  //   res.status(200).send(data);
  // })

    
  //path to index
  const path = require('path');
  var x = '';
  function indexPath(x) { 
    const indexPathJoin = path.join(__dirname, x);
    app.get("/", function (req, res) {
      res.sendFile(indexPathJoin);
    });
  };
    
  const genIndex = '../view/index.html';
  const apiIndex = './getAPIdata.js';
  
  var express = require('express');

  var assetPath = path.join(__dirname, '../js');
  app.use('/js', express.static(assetPath));
  var assetPath2 = path.join(__dirname, '../view');
  app.use('/view', express.static(assetPath2));
  var assetPath3 = path.join(__dirname, '../view/images');
  app.use('/images', express.static(assetPath3));
  var assetPath4 = path.join(__dirname, '../public/images/categories');
  app.use('/categories', express.static(assetPath4));
  var assetPath5 = path.join(__dirname, '../public/images/products');
  app.use('/products', express.static(assetPath5));

  indexPath(genIndex);
  indexPath(apiIndex);
  


  mongoose.connect("mongodb+srv://ionu:123123ionu@cluster0.g9lbv.mongodb.net/usersdb", {useUnifiedTopology: true, useNewUrlParser : true});
    //data schema
    const userSchema = {
      username: String,
      userpass: String
    };
     
      const firstUser = mongoose.model('User', userSchema);
  
      app.post('/', function(req, res){
        let newUser = new User({
          "username" : 'req.body.title',
          "userpass" : 'req.body.content'
        });
        console.log(newUser);
        newUser.save();
       // res.redirect('/');
      })
  


  // fallthrough error handler
  app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(err + '\n');
  });
  
}