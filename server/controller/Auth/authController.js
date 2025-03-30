const User = require("../../models/Auth/userModel");
const bcrypt = require("bcryptjs")
// home

const home = async (req, res) => {
    try {
        res.status(200).send("welcome user");
    } catch (error) {
        console.error(error);
    }
};


// user

const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData});
    } catch (error) {
        console.log(`Error in user: ${error}`);
    }
}

// Signin

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({email});

        if(!userExist) {
            return res.status(400).json({ message: "Invalid Credentials"});
        }

        
        // const user = await bcrypt.compare(password, userExist.password);
        const user = await userExist.comparePassword(password)

        if(user){
            res.status(200).send({
                msg : "Login Successfully", 
                token: await userExist.generateToken(), 
                userId: userExist.id.toString(),   
            });

        }else{
            res.status(401).json({message:"Invalid Email or Password"})
        }

    } catch (error) {
        res.status(500).json("Internal Server Error");
        console.error(error);
    }
};

// signUp

const signUp = async (req, res) => {
    try {
        // console.log(req.body);
        const { username, email, password } = req.body;
        
        const userExist = await User.findOne({ email});

        if(userExist){
            return res.status(409).json('User already exists');
        }
        const userCreated = await User.create({username, email , password });
        console.log(userCreated);
        res.status(201).send({
            msg : "Registration Successfully", 
            token: await userCreated.generateToken(),
            userId: userCreated.id.toString(),   });        
        } 
        catch (error) {
            res.status(500).json("Internal Server Error");
            console.log("Error in signup")
            console.error(error) 
        }   
    };

module.exports = { home , signIn, signUp, user }