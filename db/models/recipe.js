const { Schema, model } = require("mongoose");
const joi = require("joi");


// ----- СХЕМИ МОДЕЛІ ДАНИХ КОЛЕКЦІЇ "RECIPES" -------------------------------------------------------------------
  
  const recipeSchema = new Schema(
    {
        drink:{
            type: String,
            required: [true, 'Set drink title for recipe (a string between 2 and 50 characters long)'],
            minlength: 2,
            maxlenght: 50,
            unique: true,
        },
        drinkAlternate:{
            type: String,
            minlength: 2,
            maxlenght: 50,
            default: "Sorry, not specified",
        },
        tags:{
            type: String,
        },
        video:{
            type: String,
            defailt: "Sorry, not specified",
        },
        category:{
            type: String,
            required: [true, 'Set category of drink'],
        },
        IBA:{
            type: String,
            default: "Sorry, not specified",
        },
        alcoholic:{
            type: String,
            required: [true, 'Set alcoholic marker for recipe'],
            enum : ["Alcoholic","Non alcoholic"],
        },
        glass:{
            type: String,
            required: [true, 'Set type of glass for recipe'],
            minlength: 2,
            maxlenght: 20,
        },
        description:{            
            type: String,
            required: [true, 'Set description for recipe'],
        },
        instructions:{
            type: String,
            required: [true, 'Set instructions for recipe'],
          },
        instructionsES:{
            type: String,
            minlength: 10,
            maxlenght: 500,
        },
        instructionsDE:{
            type: String,
            minlength: 10,
            maxlenght: 500,
        },
        instructionsFR:{
            type: String,
            minlength: 10,
            maxlenght: 500,
        },
        instructionsIT:{
            type: String,
            minlength: 10,
            maxlenght: 500,
        },
        instructionsRU:{
            type: String,
            minlength: 10,
            maxlenght: 500,
        },
        instructionsPL:{
            type: String,
            minlength: 10,
            maxlenght: 500,
        },
        instructionsUK:{
            type: String,
            minlength: 10,
            maxlenght: 500,
        },
        drinkThumb:{
            type: String,
            required: [true, 'Set image URL for recipe'],
            default: "https://res.cloudinary.com/dxvnh0oip/image/upload/v1696136308/drinks/wineglass_zeyobt.png",
        },
        ingredients:{
            type : Array,
            required: [true, 'Set ingredients for recipe'],
            minlength: 1,
            default: undefined,
        },
        shortDescription:{
            type: String,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
        users: {
            type: Array,
            ref: 'User',
            default: [],
        }
    },
    {  
        versionKey: false,
        timestamps: true,
    }
  );

  const Recipe = model('Recipe', recipeSchema);   // створюємо модель Recipe



// ----- СХЕМИ ВАЛІДАЦІЇ ДАНИХ В ТІЛІ HTTP-запиту КОЛЕКЦІЇ "RECIPES"-----------------------------------------------------------

const getSchema = joi.object({

});

const addSchema = joi.object({
    //назва напою
    drink : joi.string().required().min(2).max(50).error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                    case "any.required": 
                                    err.message = "missing required drink field";
                                    break;
                    case "string.empty":
                                    err.message = "drink field should not be empty!";
                                    break;
                    case "string.min":
                                    err.message = `drink field should have at least ${err.local.limit} characters!`;
                                    break;
                    case "string.max":
                                    err.message = `drink field should have ${err.local.limit} characters maximum!`;
                                    break;
                    default:
                                    break;
                }
        });
        return errors;
        }),
    //категорыя напою
    category : joi.string().required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                    case "any.required": 
                                    err.message = "missing required category field";
                                    break;
                    case "string.empty":
                                    err.message = "category field should not be empty!";
                                    break;
                    default:
                                    break;
                }
        });
        return errors;
        }),    
    //опис напою
    description : joi.string().required().min(10).max(500).error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                    case "any.required": 
                                    err.message = "missing required description field";
                                    break;
                    case "string.empty":
                                    err.message = "description field should not be empty!";
                                    break;
                    default:
                                    break;
                }
        });
        return errors;
        }),
    //інструкція приготування
    instructions : joi.string().required().min(10).max(500).error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                    case "any.required": 
                                    err.message = "missing required instructions field";
                                    break;
                    case "string.empty":
                                    err.message = "description field should not be empty!";
                                    break;
                    default:
                                    break;
                }
        });
        return errors;
        }),
    //поле алкогольний або безалкогольний
    alcoholic : joi.string().required().valid("Alcoholic","Non alcoholic").error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                    case "any.required": 
                                    err.message = "missing required alcoholic field";
                                    break;
                    case "string.empty":
                                    err.message = "alcoholic field should not be empty!";
                                    break;
                    case "any.invalid":
                                    err.message = `alcoholic field should contain string "Alcoholic" or "Non alcoholic"!`;
                                    break;
                    default:
                                    break;
                }
        });
        return errors;
        }),
    //поле glass-тип эмності для напою
    glass : joi.string().required().error(errors => {
    errors.forEach(err => {
        switch (err.code) {
                case "any.required": 
                                err.message = "missing required glass field";
                                break;
                case "string.empty":
                                err.message = "glass field should not be empty!";
                                break;
            }
    });
    return errors;
        }),
    drinkThumb : joi.string().required().error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                case "any.required": 
                    err.message = "missing required drinkThumb field (URL of drink photo)";
                    break;
                case "string.empty":
                                    err.message = "drinkThumb field should not be empty!";
                                    break;
                    default:
                                    break;
                }
        });
        return errors;
        }), 
    //масив інгрідієнтів для приготування
    ingredients : joi.array().required().min(1).error(errors => {
        errors.forEach(err => {
            switch (err.code) {
                    case "any.required": 
                                    err.message = "missing required ingredients field";
                                    break;
                    case "array.min":
                                    err.message = "ingredients field should not be empty!";
                                    break;
                }
        });
        return errors;
        }),
});


const schemas = {
  getSchema,
  addSchema,
}

module.exports = { Recipe, schemas, };
