const express = require('express');
const ctrl = require('../controllers/drinks');
const {validateId, validateFormData, authenticate, upload}  = require("../middlewares");
const {schemas} = require("../db/models/recipe");
const router = express.Router();


//------------------------------------------------------------------------------------------------

router.get('/mainpage', authenticate, ctrl.getDrinksForMainPage);                               // маршрут для отримання напоїв для головної сторінки
router.get('/own', authenticate, ctrl.getAllDrinks);                                            // маршрут для отримання власних напоїв
router.get('/popular', authenticate, ctrl.getPopularDrinks);                                    // маршрут для отримання популярних напоїв
router.get('/search', authenticate, ctrl.searchDrinks);                                         // маршрут для пошуку напоїв
router.get('/favorite', authenticate, ctrl.getFavoriteDrinks);                                  // маршрут для отримання всіх своїх улюблених напоїв 
router.get('/:id', authenticate, validateId, ctrl.getDrinkById);                                // маршрут для отримання напою по його id

router.post('/own/add', authenticate, upload.single("drinkThumb"), ctrl.addDrink);              // маршрут для додавання власного напою
router.post('/favorite/add/:id', authenticate, validateId,ctrl.addDrinkToFavorite);             // маршрут для додавання напою в улюблені

router.delete('/favorite/remove/:id', authenticate, validateId, ctrl.removeDrinkFromFavorite);  // маршрут для видалення напою з улюблених
router.delete('/own/remove/:id', authenticate, validateId, ctrl.deleteDrinkById);               // маршрут для видалення власного напою

//------------------------------------------------------------------------------------------------


module.exports = router;
