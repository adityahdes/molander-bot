import quotes from '../data/quotes-list';

const commandRegex = /(quote|ooc|lambda-quotes)/;

function processCommand () {
	return quotes[Math.floor(Math.random() * quotes.length)];
}

export default {
	commandRegex,
	processCommand
};
