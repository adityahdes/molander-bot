import axios from 'axios';

const commandRegex = /.*/;
const gifPrefixRegex = /^gif\s+/;

async function processCommand (command) {
	let message;
	if (gifPrefixRegex.test(command)) {
		message = command.substring('gif'.length).trim();
	} else {
		message = command;
	}
	const apiKey = process.env.GIPHY_API_KEY;

	try {
		const response = await axios.get(`https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${message}`);

		return response.data.data.images.fixed_height.url;
	} catch (e) {
		console.log(`Error fetching gif: ${JSON.stringify(e)}`);
	}
}

export default {
	commandRegex,
	processCommand
};
