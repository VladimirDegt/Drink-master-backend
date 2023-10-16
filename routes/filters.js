const express = require('express');
const ctrl = require('../controllers/filters');
const {authenticate}  = require("../middlewares");

const router = express.Router();

//-----------------------------------------------------------------------------------------------------------

router.get('/categories', authenticate, ctrl.getCategories)         // отримання списку всіх категорій
router.get('/ingredients', authenticate, ctrl.getIngredients)       // отримання списку всіх інгрідієнтів
router.get('/glasses', authenticate, ctrl.getGlasses);              // отримання списку всіх типів емностей

//------------------------------------------------------------------------------------------------------------

module.exports = router;
