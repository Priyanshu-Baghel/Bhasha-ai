const jwt = require("jsonwebtoken");
const User = require("../models/Auth/userModel")
const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if(!token){
        return res.status(401).send({message: 'Unauthorized HTTP, No token provided'});
    }


    const jwtToken = token.replace('Bearer', "").trim();
    console.log("token from auth Middleware", jwtToken);
    try {

        const isVerified = jwt.verify(jwtToken, process.env.JWT_SCERET_KEY);
        

        const userData = await User.findOne({ email : isVerified.email}).
        select({
            password: 0,
        })
        console.log(userData);
        req.user = userData;
        req.token = token;
        req.userID = userData._id;

        next();
    } catch (error) {
        return res.status(401).json({ message : "Unauthorized. Invalid Token"});
    }
    
}


module.exports  = authMiddleware;