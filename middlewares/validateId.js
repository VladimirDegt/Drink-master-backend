const { isValidObjectId } = require("mongoose");

const validateId = (req, res, next) => {
    if (!isValidObjectId(req.params.id)){
        res.status(404).json({message : "Not found"});
        return;
    }
    next();
}

module.exports = validateId;