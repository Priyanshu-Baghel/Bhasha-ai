const {Schema, model} = require("mongoose");

const subscriptionSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required : true,
    },
    userID : {
        type: String,
        required : true,
    },
    subscription_name: {
        type: String,
        required: true
    },
    subscription_price:{
        type: Number,
        required: true,
    },
    subscriptionActive: {
            type: Boolean,
            default: false,
        },
    subscriptionExpiry: Date,

    })

const Subscription = new model("subscription", subscriptionSchema);

module.exports = Subscription;