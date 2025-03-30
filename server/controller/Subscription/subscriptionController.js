const Subscription = require("../../models/Subscription/subscritionModel");
const User = require("../../models/Auth/userModel"); // Assuming you have a User model
const Contact = require("../../models/contact/contactModel"); // Assuming you have a Contact model

const getSubscription = async (req, res) => {
    const { userId, subscription_name, subscription_price } = req.body;
    console.log(userId);
    
    try {
        const subscription = await updateUserSubscription(userId, subscription_name, subscription_price);
        if (subscription) {
            console.log(">>>> subscriptions <<<<");
            return res.status(200).json({ message: "Subscription updated successfully", subscription });
        }
    } catch (error) {
        console.error("Error in getSubscription:", error);
        return res.status(500).json({ error: error.message });
    }
}

async function updateUserSubscription(userId, subscription_name, subscription_price) {
    try {
        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            throw new Error(`User with id ${userId} not found`);
        }

        // Assuming Contact is your Mongoose model for contacts
        const contact = await Contact.findOne({ email: user.email });
        const subscriptionExpiry = new Date(Date.now() + (365 * 24 * 60 * 60 * 1000));

        if (contact) {
            contact.subscriptionActive = true;
            contact.subscriptionExpiry = subscriptionExpiry;
            console.log(`Contact with email ${user.email} found`);
            await contact.save();
        }

        // Set subscription active for 1 year
       
        user.subscriptionActive = true;
        user.subscriptionExpiry = subscriptionExpiry;

        // Save the updated user and contact objects
        await user.save();
 

        // Create or update the subscription in the Subscription model
        const subscriptionData = {
            username: user.username,
            email: user.email,
            userID: user._id,
            subscription_name,
            subscription_price,
            subscriptionActive: true,
            subscriptionExpiry: subscriptionExpiry,
        };

        let subscription = await Subscription.findOneAndUpdate(
            { userID: user._id },
            subscriptionData,
            { new: true, upsert: true }
        );

        console.log(`Updated subscription for user ${userId} to active for 1 year.`);
        return subscription;
    } catch (error) {
        console.error("Error updating user subscription:", error);
        throw error; // Propagate the error to handle it in the caller function (payment function)
    }
}

module.exports = { getSubscription };
