import axios from 'axios';
// location
export const fetchLocationFromIP = async (ip) => {
    const url = `http://ip-api.com/json/${ip}`; // Generate the URL based on the provided IP address
    console.log('Fetching location from URL:', url);

    try {
        const response = await axios.get(url);
        // console.log('Fetched location data:', response.data);

        // Check if the API response was successful
        if (response.data.status !== 'success') {
            throw new Error(`Failed to fetch location: ${response.data.message}`);
        }

        const { city, region, country, lat, lon } = response.data; // Use the correct property names from the API response
        return {
            city,
            region,
            country,
            coordinates: {
                lat,
                lon,
            },
        };
    } catch (error) {
        console.error('Error fetching location:', error.message);
        return null;
    }
};
