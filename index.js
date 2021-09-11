const { serviceThatCallsApi } = require('../services/UserServices');
const categoriesData = serviceThatCallsApi('categories'); 
// here (categoriesData) I have data from the API and is printed to terminal like this:
//              {
//                  "image": "categories/mens-accessories-luggage.jpg",
//                  "_id": "5e797c450d754a55dcf9f41e",
//                  "id": "mens-accessories-luggage",
//                  "name": "Luggage",
//                  "page_description": "Shop Men's Wheeled Luggage. Versatile, rugged suitcases, baggage, holdalls and shoulder bags. All with famous long-lasting quality.",
//                  "page_title": "Men's Wheeled Luggage",
//                  "parent_category_id": "mens-accessories",
//                  "c_showInMenu": true,
//                  "__v": 0
//                },
//
//How I can access data from another module to display it in index.htm? If I call the function in module I get an error: getAPIdata.js:1 Uncaught ReferenceError: require is not defined

module.exports = function(app) {
 
    app.use('/users', require('./UserRoutes'));
    // You can add others app.use with other route files
    
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
    ress = require('express');
    var assetPath = path.join(__dirname, '../js');
    app.use('/js', express.static(assetPath));

    indexPath(genIndex);

    // fallthrough error handler
    app.use(function onError(err, req, res, next) {
      // The error id is attached to `res.sentry` to be returned
      // and optionally displayed to the user for support.
      res.statusCode = 500;
      res.end(err + '\n');
    });
  
}
