const commandRegex = /^help/;

function processCommand(command) {
    return { text: 'I\'ll help out eventually' };
}

export default {
	commandRegex,
	processCommand
};
