import { sleep } from 'sleep';
import shipper from './message-shipper';
import commands from './commands';

function respond () {
	const request = JSON.parse(this.req.chunks[0]);

	sleep(2);

	console.log('Received Event', JSON.stringify(request));

	if (request.text) {
		const res = this.res;
		return respondTo(request.text, function (id, message) {
			shipper.postMessage(res, id, message);
		});
	} else {
		console.log('Message ignored');
		this.res.writeHead(200);
		this.res.end();
	}
}

async function respondTo (text, post) {
	const bots = [{ name: '/molander', id: process.env.BOT_ID },
		{ name: '@molander-bot', id: process.env.BOT_ID },
		{ name: '/test', id: process.env.TEST_BOT_ID }];

	for (const bot of bots) {
		if (text.startsWith(bot.name)) {
			const withoutName = text.substring(bot.name.length).trim();
			const message = await parseCommand(withoutName);
			post(bot.id, message);
		}
	}
}

function parseCommand (text) {
	for (const command of commands) {
		if (command.commandRegex.test(text)) {
			return command.processCommand(text);
		};
	}
}

export default {
	respond
};
