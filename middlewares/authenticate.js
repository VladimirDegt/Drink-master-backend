const { httpError } = require('../helpers');
const jwt = require("jsonwebtoken");
const {User} = require("../db/models/user");
require('dotenv').config();

const {SECRET_KEY} = process.env;

// middleware <authenticate> для перевірки токена
const authenticate = async (req, res, next) => {
    
    const {authorization = ""} = req.headers;
    const [bearer, token] = authorization.split(" ");
    
    if (bearer !== "Bearer") {
        next(httpError(401, "Not authorized"));
    }

    try 
        {
            const {id} = jwt.verify(token, SECRET_KEY);
            const user = await User.findById(id);

            if (!user || !user.token || user.token != token ){
                next(httpError(401, "Not authorized"));
            }
            
            req.user = user;
            const {_id, email, name, avatarURL, birthdate} = req.user;
            next();
        }
    catch(error)
        {
            next(httpError(401, "Not authorized"));
        }
        
}

module.exports = authenticate;
