import sinon from 'sinon';
import Chance from 'chance';
import HTTPS from 'https';
import shipper from '../src/message-shipper';

let sandbox;
let chance;
let responseStub;
let botId;
let botResponse;

describe('message shipper test', () => {
	before(() => {
		sandbox = sinon.createSandbox();
		chance = new Chance();
	});

	beforeEach(() => {
		responseStub = {
			writeHead: sandbox.stub(),
			end: sandbox.stub()
		};
		botId = chance.string();
		botResponse = chance.string();
		sandbox.stub(console, 'log');
	});

	afterEach(() => {
		sandbox.restore();
	});

	context('when posting a message', () => {
		let httpsStub;
		let onRequestStub;
		let endRequestStub;

		beforeEach(() => {
			onRequestStub = sandbox.stub();
			endRequestStub = sandbox.stub();
			httpsStub = {
				on: onRequestStub,
				end: endRequestStub
			};
			sandbox.stub(HTTPS, 'request').returns(httpsStub);
		});

		context('if the bot responds with an object', () => {
			beforeEach(() => {
				botResponse = {};
				shipper.postMessage(responseStub, botId, botResponse);
			});

			it('should respond with the botId embedded in the bot response', () => {
				sinon.assert.calledWith(httpsStub.end, JSON.stringify({ bot_id: botId }));
			});
		});

		context('if the request succeeds', () => {
			beforeEach(() => {
				shipper.postMessage(responseStub, botId, botResponse);
			});

			it('should write a 200 response code', () => {
				sinon.assert.calledWith(responseStub.writeHead, 200);
			});

			it('should end the response', () => {
				sinon.assert.calledOnce(responseStub.end);
			});

			it('should setup the HTTPS request', () => {
				sinon.assert.calledWithMatch(onRequestStub, 'error', sinon.match.func);
				sinon.assert.calledWithMatch(onRequestStub, 'timeout', sinon.match.func);
			});
		});

		context('if the https request errors', () => {
			let expectedError;

			beforeEach(() => {
				expectedError = chance.string();
				onRequestStub
					.withArgs('error', sinon.match.func)
					.callsArgWith(1, expectedError);
				shipper.postMessage(responseStub, botId, botResponse);
			});

			it('should log the error', () => {
				sinon.assert.calledWith(console.log, `error posting message ${JSON.stringify(expectedError)}`);
			});
		});

		context('if the https request times out', () => {
			let expectedError;

			beforeEach(() => {
				expectedError = chance.string();
				onRequestStub
					.withArgs('timeout', sinon.match.func)
					.callsArgWith(1, expectedError);
				shipper.postMessage(responseStub, botId, botResponse);
			});

			it('should log the error', () => {
				sinon.assert.calledWith(console.log, `timeout posting message ${JSON.stringify(expectedError)}`);
			});
		});

		context('when the https request responds with a 202', () => {
			let expectedHttpsResponse;

			beforeEach(() => {
				expectedHttpsResponse = {
					statusCode: 202
				};
				HTTPS.request.restore();
				sandbox.stub(HTTPS, 'request')
					.callsFake((options, callback) => {
						callback(expectedHttpsResponse);
						return httpsStub;
					});
				shipper.postMessage(responseStub, botId, botResponse);
			});

			it('should log the success message', () => {
				sinon.assert.calledWith(console.log, 'POST successful');
			});
		});

		context('when the https request responds with a non 202', () => {
			let expectedHttpsResponse;

			beforeEach(() => {
				expectedHttpsResponse = {
					statusCode: 400
				};
				HTTPS.request.restore();
				sandbox.stub(HTTPS, 'request')
					.callsFake((options, callback) => {
						callback(expectedHttpsResponse);
						return httpsStub;
					});
				shipper.postMessage(responseStub, botId, botResponse);
			});

			it('should log the error message', () => {
				sinon.assert.calledWith(console.log, `Rejecting bad status code ${expectedHttpsResponse.statusCode}`);
			});
		});
	});
});
