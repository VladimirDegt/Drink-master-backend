const {Recipe} = require('../db/models/recipe');
const {Ingredient} = require('../db/models/ingredient');
const { ctrlWrapper } = require('../helpers/');


//------ КОНТРОЛЛЕРИ ДЛЯ РОБОТИ ІЗ КОЛЛЕКЦІЄЮ RECIPES ТА INGREDIENTS ( для маршрута /filters) --------------

  // отримання списку категорій із колекції recipes
  const getCategories = async (req, res) => {
    const result = await Recipe.distinct("category");
    res.json(result);
  }

  // отримання списку інгрідієнтів із колекції ingridients
  const getIngredients = async (req, res) => {
     const result = await Ingredient.find().select('_id title ingredientThumb');
    res.json(result);
  }

  // отримання списку ємностей для напоїв із колекції recipes
  const getGlasses = async (req, res) => {
    const result = await Recipe.distinct("glass");
    res.json(result);
  }

//---------------------------------------------------------------------------------------------------------

module.exports = {
    getCategories: ctrlWrapper(getCategories),
    getIngredients: ctrlWrapper(getIngredients),
    getGlasses: ctrlWrapper(getGlasses),
}
