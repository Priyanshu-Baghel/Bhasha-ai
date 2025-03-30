const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user_id :{
        type : String,
        required : true,
    },
    college : {
        type: String, 
        required: true,
    },
    branch : {
        type : String,
        required: true,
    },
    year : {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },    
    interest : {
        type: String, 
        required: true,
    },
    linkdin : {
        type: String,
        required : true,
    },
    github : {
        type: String,
        required : true,
    }, 
    others : {
        type: String,
        required : false,
    }
});

const Profile = new mongoose.model("Profile", profileSchema);
module.exports = Profile;