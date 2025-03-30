const express  = require('express');
const router = express.Router();
const courses = require("../../controller/course/courseController");

router.route('/course').get(courses);

module.exports = router;