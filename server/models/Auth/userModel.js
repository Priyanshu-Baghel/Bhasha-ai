const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username : {
        type: String, 
        required: true,
    },
    email : {
        type: String, 
        required: true,
        unique: true,
    },
    password : {
        type : String,
        required: true,
    },
    subscription: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    role: {
        type: String,
        enum: ['admin', 'general'],
        default: 'general',
    },
    phone: {
        type: String,
        required: false,
    },
    isProfessor: {
        type: Boolean,
        default: false,
    },
    subscriptionActive: {
        type: Boolean,
        default: false,
    },
    subscriptionExpiry: Date,
});

// securing the password with the bcrypt
userSchema.pre('save', async function(next){
    console.log("pre method", this);
    const user = this;

    if(!user.isModified('password')){ 
        return next()
    };

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password  = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }

})


// compare the password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}


// JWT for signUp

userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
            isProfessor: this.isProfessor,
        },
        process.env.JWT_SCERET_KEY,
        {
            expiresIn: "15d",
        }
        );
    } catch (error) {
        console.error(error);
    }
};

const User = new mongoose.model("User", userSchema);
module.exports = User;