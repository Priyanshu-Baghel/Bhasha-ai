const Course = require("../../models/course/courseModel")

const courses = async (req, res) => {
    try {
        const response = await Course.find();
        if(!response){
            res.status(404).json({ msg : "no service found"});
            return;
        }
        res.status(200).json({ msg: response});
    } catch (error) {
        console.log(`course error: ${error}`);
    }
}

module.exports = courses;