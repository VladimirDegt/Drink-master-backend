const express = require('express');
const ctrl = require('../controllers/ingredients');
const {validateId, authenticate}  = require("../middlewares");
const router = express.Router();


//------------------------------------------------------------------------------------------------

router.get('/:id', authenticate, validateId, ctrl.getIngredientById);                        // маршрут для отримання інгредієнта по цього id

//------------------------------------------------------------------------------------------------


module.exports = router;
