const express = require("express");
const router = express.Router();
const profileController = require("../../controller/profile/profileController")

router.route("/complete_profile").post(profileController.profileForm);
router.route("/getProfile").post(profileController.getProfile);

module.exports = router;