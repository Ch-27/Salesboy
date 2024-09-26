const axios = require('axios');
const User = require('../models/userModel');
const Ad = require('../models/adModel');

// Generate a personalized ad for a user
const generateAd = async (req, res) => {
  const { userId } = req.body;

  try {
    // Fetch user data
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Prepare prompt for GPT
    const prompt = `Generate a conversational ad for a user interested in ${user.preferences.join(', ')}. 
                    The user is located in ${user.profile.location}.`;

    // Call GPT API
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'gpt-4',
      prompt: prompt,
      max_tokens: 150,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GPT_API_KEY}`,
      },
    });

    const adContent = response.data.choices[0].text.trim();

    // Save the generated ad in the database
    const newAd = new Ad({
      userId: user._id,
      content: adContent,
    });
    await newAd.save();

    // Return the ad to the client
    res.status(200).json({ ad: newAd });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateAd };
