const User = require('../../models/Auth/userModel');
const Message = require("../../models/contact/contactModel");
const Course = require("../../models/course/courseModel");

/* 
----------------------------------
ALL Get APIS Here
----------------------------------
*/

const getAllActiveUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAllMessages = async (req, res) => {
    try {
    const message = await Message.find();
    if(message === null){
      res.status(200).json({message: "No Messages Found" })
    }

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getAllCourses = async(req,res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/* 
----------------------------------
ALL Post APIS Here
----------------------------------
*/

const addCourse = async(req,res) => {
    try {
        const { course_name, course_description, language, platform } = req.body;

        const courseExist = await User.findOne({course_name,language});

        if(courseExist) {
            return res.status(400).json({ message: "Course Exist"});
        }
        const courseCreated = await Course.create({ course_name, course_description, language, platform });
        console.log(courseCreated);
        res.status(201).send({
            msg : "Course Added Successfully",
            CourseId: courseCreated.id.toString(),   
        });        
        } 
        catch (error) {
            res.status(500).json("Internal Server Error");
            console.log("Error in adding course")
            console.error(error) 
        }    
}


module.exports = { getAllActiveUsers, getAllMessages, getAllCourses, addCourse};