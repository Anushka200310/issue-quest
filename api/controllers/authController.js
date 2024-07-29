import User from "../models/userModel.js";
import  bcrypt  from "bcryptjs";

//sign up logic

const SignUp = async(req, res, next)=> {
    try {
       // console.log(req.body)
        const {name, email, password} = req.body;

        const userExist = await User.findOne({email:email});

        if(userExist){
            return res.status(400).json({message : "email already exist"});
        }

        const CreateUser = await User.create({name, email, password});

        res.status(201).json({msg : "registration successfull", token: await CreateUser.generateToken(), userId: CreateUser._id.toString()});
    } catch (error) {
       next(error);
    }

}

//login logic

const LogIn =async(req, res, next)=>{
    try {
        const {email, password} = req.body;
        const userExist = await User.findOne({email});

        if(!userExist){
            return res.status(400).json({msg: "Invalid credentials"});
        }
       // const isPasswordExist = await User.findOne({password});

       const isPasswordExist = await bcrypt.compare(password, userExist.password);

        if(isPasswordExist){
            return res.status(200).json({msg: "Login successful", token: await userExist.generateToken(), userId: userExist._id.toString()})
        }else{
            res.status(401).json({msg: "invalid password or email"});
        }
        
    } catch (error) {
       next(error);
    }

}



//Google signup logic

const Google = async(req, res, next)=>{
    try {
        const user = await User.findOne({ email : req.body.email })

        if(user){
            return res.status(200).json({msg : 'You have logged in using google', token: await user.generateToken(), userId: user._id.toString()})

        }else{
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = bcrypt.hashSync(generatedPassword,10);

            const newUser = await User.create({
            name : req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), 
            email : req.body.email, 
            password : hashedPassword, 
            avatar : req.body.photo});


            return res.status(201).json({ msg: 'User created successfully', token: await newUser.generateToken(), userId: newUser._id.toString() });

        }
    } catch (error) {
        next(error);
    }
}


// to send user data - user logic

const user = async(req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        res.status(200).json({userData});
        
    } catch (error) {
        console.log(`error from the server ${error}`);
    }
} 

export { SignUp, LogIn, Google, user };



