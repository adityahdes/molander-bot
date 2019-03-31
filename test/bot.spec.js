import sinon from 'sinon';
import proxyquire from 'proxyquire';
import Chance from 'chance';

let sandbox;
let chance;
let bot;
let expectedBot;
let expectedBotId;
let commands;
let shipperStub;
let expectedRequest;
let expectedResponse;
let processCommandStub;
let sleepStub;

describe('bot test suite', () => {
	before(() => {
		sandbox = sinon.createSandbox();
		chance = new Chance();
	});

	beforeEach(() => {
		processCommandStub = sandbox.stub();
		shipperStub = {
			postMessage: sandbox.stub()
		};
		sleepStub = {
			sleep: sandbox.stub()
		};
		sandbox.stub(console, 'log');
		commands = [{
			commandRegex: /testPrefix/,
			processCommand: processCommandStub
		}];
		bot = proxyquire('../src/bot', {
			'./commands': commands,
			'./message-shipper': shipperStub,
			'sleep': sleepStub
		});
	});

	afterEach(() => {
		sandbox.restore();
	});

	context('when responding to a message', () => {
		context('when prompted with a known command', () => {
			let expectedCommand;
			let expectedCommandText;
			let expectedMessageResponse;

			beforeEach(async () => {
				expectedMessageResponse = chance.string();
				expectedBot = '/molander';
				expectedBotId = chance.string();
				process.env.BOT_ID = expectedBotId;
				expectedCommand = 'testPrefix';
				expectedCommandText = chance.string();
				expectedRequest = {
					chunks: [JSON.stringify({
						text: expectedBot + expectedCommand + expectedCommandText
					})]
				};
				expectedResponse = {
					writeHead: sandbox.stub(),
					end: sandbox.stub()
				};
				processCommandStub.resolves(expectedMessageResponse);
				bot = proxyquire('../src/bot', {
					'./commands': commands,
					'./message-shipper': shipperStub,
					'sleep': sleepStub
				});
				bot.req = expectedRequest;
				bot.res = expectedResponse;
				bot.commands = commands;
				await bot.respond();
			});

			it('should process the command with the correct handler', async () => {
				sinon.assert.calledWith(shipperStub.postMessage, expectedResponse, expectedBotId, expectedMessageResponse);
			});
		});
	});

	context('when given a request without text', () => {
		beforeEach(async () => {
			expectedRequest = {
				chunks: [JSON.stringify({})]
			};
			expectedResponse = {
				writeHead: sandbox.stub(),
				end: sandbox.stub()
			};
			bot.req = expectedRequest;
			bot.res = expectedResponse;
			await bot.respond();
		});

		it('should ignore the message', () => {
			sinon.assert.calledWith(console.log, 'Message ignored');
			sinon.assert.calledWith(expectedResponse.writeHead, 200);
			sinon.assert.calledOnce(expectedResponse.end);
		});
	});
});
