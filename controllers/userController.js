import User from '../models/userModel.js';
import { fetchLocationFromIP } from '../utils/locationUtils.js'



// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Create a new user
 const createUser = async (req, res) => {
  try {
    const { name, email, preferences } = req.body;

    // Get user's IP address from request (assuming it's forwarded in headers)
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // const ip="103.164.211.143"; (use your ip for maual testing)
    // Fetch location data using the IP address
    const location = await fetchLocationFromIP(ip);
    // console.log('Fetched location:', location);
    // Create a new user with location data stored in profile
    const user = new User({
      name,
      email,
      preferences,
      profile: {
        location: location || {},  // Save location in profile if available
      },
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { getUsers, createUser };
