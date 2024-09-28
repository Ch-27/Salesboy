import axios from 'axios';
import User from '../models/userModel.js';
import Ad from '../models/adModel.js';
import dotenv from 'dotenv';
dotenv.config();
import OpenAI from "openai";

const openai = new OpenAI({
    organization: "org-Tahq0siBVB7VMVTKgUWXVK2z",
    project: "proj_kSkVq0Ch5a1WAoJcC1rfSr7n",
    apiKey: process.env.OPENAI_API_KEY,
});

// Generate a personalized ad for a user
export const generateAd = async (req, res) => {
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

const response = await axios.post(
  'https://api.openai.com/v1/completions',
  {
    model: "gpt-3.5-turbo-0125", // or 'gpt-3.5-turbo', depending on your choice
    messages: [{content:prompt}],
    max_tokens: 150, // Adjust this based on your needs
    n: 1, // Number of responses
    stop: null, // Optional: stop sequences
    temperature: 0.7, // Adjust the creativity of the output
  },
  {
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  }
);

// const response = await openai.chat.completions.create({
//   model: "gpt-3.5-turbo-0125",
//   messages: [{content:prompt}],
//   temperature: 1,
//   max_tokens: 50,
//   top_p: 1,
//   frequency_penalty: 0,
//   presence_penalty: 0,
//   response_format: {
//     "type": "text"
//   },
// });

const adContent = response.data.choices[0].text.trim();

// Save the generated ad in the database
const newAd = new Ad({
  userId: user._id,
  content: adContent, // Save the generated ad content
});
await newAd.save();

// Return the ad to the client
res.status(200).json({ ad: newAd });
    
    // console.log('GPT API response:', result);

    
    
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

