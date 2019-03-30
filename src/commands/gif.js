import axios from 'axios';

const commandRegex = /.*/;
const gifPrefixRegex = /^gif\s+/;

async function processCommand(command) {
    let message;
    if (gifPrefixRegex.test(command)) {
        message = command.substring('gif'.length).trim();
    } else {
        message = command;
    }
    const api_key = process.env.GIPHY_API_KEY;

    try {
        const response =
            await axios.get(`https://api.giphy.com/v1/gifs/translate?api_key=${api_key}&s=${message}`);
            
        return response.data.data.images.fixed_height.url;
    } catch (e) {
        console.log('Error fetching gif:', e);
        return;
    }
}

export default {
	commandRegex,
	processCommand
};
