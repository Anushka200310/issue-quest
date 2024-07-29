import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async(req, res, next) => {
    const token = req.headers['authorization'];

    if(!token){
        return res.status(401).json({msg : "Unauthorized Http, Token not provided"});

    }

    //console.log("token from auth middleware", token);

     const jwtToken = token.replace("Bearer", "").trim();

     console.log("token from auth middleware", jwtToken);

     try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);


        const userData = await User.findOne({email : isVerified.email}).select({password : 0});
        console.log(userData);

        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        next();

     } catch (error) {

        res.status(401).json({msg : "Unauthorized, Invalid token"});

     } 
}

export default authMiddleware;