const { httpError } = require('../helpers');
  
const validateBody = (schema) => {
    const func = (req, res, next) => {
        if (!Object.keys(req.body).length)
        {            
            next(httpError(400, "missing fields"));
        }
        else
        {
            const { error } = schema.validate(req.body);
            if (error) { 
                next(httpError(400, error.message)); 
            };
        }
        next();
    }
    return func;
}

module.exports = validateBody;
