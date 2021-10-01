const express = require('express')

const routes = express.Router();
const UserController = require('../controllers/UserController');
const UserServices = require('../services/UserServices');


routes.get('/helloWorld', UserController.helloWorld);
routes.get('/servicecall', UserController.controllerWithParams);
routes.get('/serviceThatCallsApi', UserServices.serviceThatCallsApi);


module.exports = routes;
