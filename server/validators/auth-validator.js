const { z } = require("zod");

// creating an object schema

const signUpSchema = z.object({
    username: z.string({
        required_error: "Name is required"})
        .trim()
        .min(3, { message: "Name is Too short"} )
        .max(255, { message:  "Name is Too long"}),
    email: z
    .string({required_error : 'Email is required' })
    .trim()
    .email( {message:'Please enter a valid Email'} )
    .min(3, { message: "email is Too short"} )
    .max(255, { message:  "email is Too long"}),
    password: z
    .string({required_error : 'Password is required' })
    .min(8, { message: "Password must be contain 8 Character's"} )
    .max(255, { message:  "Password must not be contain more than 255 Character's"}),
})

module.exports = {signUpSchema}