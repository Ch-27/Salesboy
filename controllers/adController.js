const axios = require('axios');
const User = require('../models/userModel');
const Ad = require('../models/adModel');


// Generate a personalized ad for a user
const generateAd = async (req, res) => {
  // console.log('generateAd controller called');
  // console.log('Received request body:', req.body);
  const {userID}  = req.body;
  // console.log('Received userId:', userID);
  try {
    // Fetch user data
    const user = await User.findById({_id:userID});
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Prepare prompt for EdenAI API
    const prompt = `Generate a conversational ad for a user interested in ${user.preferences.join(', ')}. 
                    The user is located in ${user.profile.location}.`;

    // Payload for EdenAI API
    const payload = {
      input: prompt,  // Adjust the input to what EdenAI expects (likely 'input')
    };

    // Call EdenAI API
    const url = "https://api.edenai.run/v2/workflow/db575b66-2c69-47aa-823d-199b0cc613e3/execution/";
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.API_KEY}`,  // Use your EdenAI API key from env
      }
    });

    // Extract the ad content from EdenAI response (check the response structure)
    const adContent = response.data.result;  // Adjust based on EdenAI's actual response structure

    // Save the generated ad in the database
    const newAd = new Ad({
      userId: user._id,
      content: adContent,  // Save the generated ad content
    });
    await newAd.save();

    // Return the ad to the client
    res.status(200).json({ ad: newAd });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateAd };
