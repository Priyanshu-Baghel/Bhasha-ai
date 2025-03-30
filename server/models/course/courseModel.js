const {Schema, model} = require("mongoose");

const courseSchema = new Schema({
    course_name: {
        type: String,
        required: true
    },
    course_description:{
        type: String, 
        required: true
    },
    language:{
        type: String, 
        required: true
    },
    platform:{
        type: String, 
        required: true
    },
   
})

const Course = new model("course", courseSchema);

module.exports = Course;