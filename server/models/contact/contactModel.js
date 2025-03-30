const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    username : {
        type: String, 
        required: true,
    },
    email : {
        type: String, 
        required: true,
        unique: true,
    },
    phone : {
        type : String,
        required: true,
    },
    message: {
        type: String,
        required : true,
    },
    subscriptionActive: {
        type: Boolean,
        default: false,
    },
    subscriptionExpiry: Date,
});

const Contact = new mongoose.model("Contact", contactSchema);
module.exports = Contact;