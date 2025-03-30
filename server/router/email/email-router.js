const express = require("express");
const router = express.Router();

const { sendEmail } = require("../../controller/email/email-controller");

router.post("/sendEmail", sendEmail);

module.exports = router;