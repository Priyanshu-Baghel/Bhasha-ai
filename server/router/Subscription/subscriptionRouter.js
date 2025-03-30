const express = require("express");
const router = express.Router();
const SubscriptionController = require("../../controller/Subscription/subscriptionController")

router.route("/getSubscription").post(SubscriptionController.getSubscription);

module.exports = router;