const axios = require('axios');
const User = require('../models/userModel');
const Ad = require('../models/adModel');
require('dotenv').config();

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
    const url = "https://api.edenai.run/v2/workflow/db575b66-2c69-47aa-823d-199b0cc613e3/execution/";
    const payload = { "prompt": prompt };  // Make sure to provide a valid string prompt
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.SANDBOX_API_KEY}`,
      },
      body: JSON.stringify(payload)  // Convert the payload to a JSON string
    });
    const result = await response.json();
    
    // console.log('GPT API response:', result);

    if (result.content.status === 'running') {
      // You might want to implement a mechanism to check the results later
      // For now, we will return a placeholder message or handle accordingly
      console.log('The ad generation is still running. Please check back later.');
    } else if (result.content.status === 'completed') {
      // Assuming there is a way to access results when completed
      const adContent = result.content.results; // Adjust this based on the actual results structure
      
          // Convert the results object to a string if necessary
          const adContentString = JSON.stringify(adContent); // Convert object to JSON string
      
          // Create the new ad
          const newAd = new Ad({
            userId: user._id,
            content: adContentString, // Save the generated ad content as a string
          });
        
    console.log('the ad is' ,adContent);
    await newAd.save();

    // Return the ad to the client
    res.status(200).json({ ad: newAd });
    }


    // ***********************________________
    // const adContent = result.content.results;
    //   // Convert the results object to a string if necessary
    //   const adContentString = JSON.stringify(adContent); // Convert object to JSON string
  
    //   // Create the new ad
    //   const newAd = new Ad({
    //     userId: user._id,
    //     content: adContentString, // Save the generated ad content as a string
    //   });
    
    // console.log('the ad is' ,newAd);
    // console.log('the ad content is' ,adContent);
    // await newAd.save();

    // // Return the ad to the client
    // res.status(200).json({ ad: newAd });
    
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateAd };
