const express = require("express");
const router = express.Router();
const User = require("../../models/Auth/userModel");
const adminController = require("../../controller/Admin/adminController");

router.route('/getAllUsers').get(adminController.getAllActiveUsers);
router.route('/getAllMessages').get(adminController.getAllMessages);
router.route('/getAllCourses').get(adminController.getAllCourses);
router.route('/addCourse').post(adminController.addCourse);

// user Update Code
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { email, subscription, role, phone } = req.body;

  try {

    if(!id){
        res.status(500).json({msg : 'Internal Server Error'});
    }
    // Check if the user exists
    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update user fields
    user.email = email;
    user.subscription = subscription;
    if(subscription === "active"){
        user.subscriptionActive = true;
    }else{
        user.subscriptionActive = false;
    };
    user.role = role;
    user.phone = phone;

    // Save updated user
    await user.save();

    res.status(200).json({ msg: 'User updated successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;