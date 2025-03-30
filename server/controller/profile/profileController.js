const Profile = require("../../models/profile/profileModel");

const profileForm = async (req, res) => {
    try {
        const response = req.body;
        console.log(response);
        if(!response.user_id){
            return res.status(400).json({message: "bad request for user not exist"});
        };

        const existingProfile = await Profile.findOne({user_id: response.user_id})
        if(existingProfile){
            const profile = new Profile(req.body);
            await profile.save();
            return res.status(201).json({message : "Profile Update Successfully"});
        }
        else{
            console.log("bsdvesv ")
            await Profile.create(response);
            return res.status(201).json({message : "Profile Completed Successfully"});
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Profile Not Completed Delivered'});
    }
}

const getProfile = async (req, res) => {
        try {
        const profile = req.body;
        console.log(profile)
        const response = await Profile.findOne({user_id: profile.user_id});
        if(!response){
            res.status(404).json({ msg : "no profile found"});
            return;
        }
        console.log(response);
        res.status(200).json({ msg: response});
    } catch (error) {
        console.log(`profile error: ${error}`);
    }
}

module.exports = {profileForm , getProfile}; 