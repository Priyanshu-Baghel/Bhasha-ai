const express = require("express");
const router = express.Router();
const contactController = require("../../controller/contact/contactController")

router.route("/contact").post(contactController);

module.exports = router;