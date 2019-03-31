import HTTPS from 'https';

function makeBody (botID, message) {
	if (typeof message === 'string') {
		return {
			'bot_id': botID,
			'text': message
		};
	} else {
		message.bot_id = botID;
		return message;
	}
}

function postMessage (response, botID, botResponse) {
	response.writeHead(200);

	const options = {
		hostname: 'api.groupme.com',
		path: '/v3/bots/post',
		method: 'POST'
	};

	const body = makeBody(botID, botResponse);

	console.log('Sending ' + JSON.stringify(body, null, 4));

	const botReq = HTTPS.request(options, function (res) {
		if (res.statusCode === 202) {
			console.log('POST successful');
		} else {
			console.log('Rejecting bad status code ' + res.statusCode);
		}
	});

	botReq.on('error', function (err) {
		console.log('error posting message ' + JSON.stringify(err));
	});
	botReq.on('timeout', function (err) {
		console.log('timeout posting message ' + JSON.stringify(err));
	});
	botReq.end(JSON.stringify(body));

	response.end();
}

export default {
	postMessage
};
