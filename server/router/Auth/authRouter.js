const express = require("express");
const authController = require("../../controller/Auth/authController");
const router = express.Router();
const validate = require("../../middlewares/validate-middleware")
const signUpSchema = require("../../validators/auth-validator")
const authMiddleware = require("../../middlewares/authMiddleware")


router.route("/").get(authController.home);

router.route("/signin").post(authController.signIn);

router.route("/signup").post(authController.signUp);

router.route('/user').get(authMiddleware, authController.user);

module.exports = router;