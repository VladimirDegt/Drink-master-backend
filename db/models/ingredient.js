const { Schema, model } = require("mongoose");
const joi = require("joi");

const abvRegExp = /^(([1-9]|[1-9][0-9]|1[0-4][0-9]|100)([,-](?=\d)|$))+$/    // регулярний вираз для поля abv: значення від 0 до 100

// ----- СХЕМИ МОДЕЛІ ДАНИХ КОЛЕКЦІЇ "INGRIDIENTS" -------------------------------------------------------------------
const ingredientSchema = new Schema(
  {
    title:{
      type: String,
      required: [true, 'Set title for ingridient'],
      minlength: 3,
      maxlenght: 40,
    },
    ingredientThumb:{
      type: String,
      required: [true, 'Set ingredientThumb for ingridient'],
      default: 'https://res.cloudinary.com/dxvnh0oip/image/upload/v1696136308/drinks/wineglass_zeyobt.png',
    },
    thumb_medium:{
      type: String,
      required: [true, 'Set thumb_medium for ingridient'],
      default: "https://res.cloudinary.com/dxvnh0oip/image/upload/v1696253875/drinks/image_tb2u5z.png",
    },
    thumb_small:{
      type: String,
      required: [true, 'Set thumb_small for ingridient'],
      default: 'https://res.cloudinary.com/dxvnh0oip/image/upload/v1696253875/drinks/unsplash_J9lD6FS6_cs_pvesaq.png',
    },
    abv:{
      type: String,
      match: abvRegExp,
    },
    alcohol:{
      type: String,
      required: [true, 'Set alcohol marker for ingridient'],
      enum: ["Yes", "No"],
      default: "No",
    },
    description: {
      type: String,
      required: [true, 'Set description for ingridient'],
      minlength: 10,
      maxlenght: 500,
    },
    type:{
      type: String,
      required: [true, 'Set type for ingridient'],
      maxlenght: 30,
    },
    flavour:{
      type: String,
      required: [true, 'Set flavour for ingridient'],
      maxlenght: 50,
    },
    country: {
      type: String,
      required: [true, 'Set country for ingridient'],
      maxlenght: 100,
    },
  },
  {  
      versionKey: false,
      timestamps: true,
  }
);
const Ingredient = model('Ingridient', ingredientSchema);   // створюємо модель Ingridient


// ----- СХЕМИ ВАЛІДАЦІЇ ДАНИХ В ТІЛІ HTTP-запиту ДО КОЛЕКЦІЇ "INGRIDIENTS"-----------------------------------------------------------
const getSchema = joi.object({
  
});

const addSchema = joi.object({
});


const schemas = {
  getSchema,
  addSchema,

}

module.exports = { Ingredient, schemas, };
