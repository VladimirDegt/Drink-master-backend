const { Ingredient } = require('../db/models/ingredient');
const { httpError, ctrlWrapper} = require('../helpers/');

//+ отримання інгрудієнту за йього _id для поточного(залогіненого) юзера
const getIngredientById = async (req, res) => {
    const {id} = req.params;
    const result = await Ingredient.findById(id);
    if (!result) { throw httpError(404, "Not found"); }
    res.json(result);
}

module.exports = {
    getIngredientById: ctrlWrapper(getIngredientById),
  };