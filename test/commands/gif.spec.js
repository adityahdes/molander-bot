import { expect } from 'chai';
import { createSandbox } from 'sinon';
import Chance from 'chance';
import axios from 'axios';
import gif from '../../src/commands/gif';

let sandbox;
let chance;
let expectedApiKey;

before(() => {
	sandbox = createSandbox();
	chance = new Chance();
});

beforeEach(() => {
	expectedApiKey = chance.string();
	process.env.GIPHY_API_KEY = expectedApiKey;
});

afterEach(() => {
	sandbox.restore();
});

describe('gif command', () => {
	let expectedCommand;
	let expectedGiphyEndpoint;
	let expectedGiphyResponse;
	let expectedGifResult;

	beforeEach(() => {
		expectedGifResult = chance.string();
		expectedGiphyResponse = {
			data: {
				data: {
					images: {
						fixed_height: {
							url: expectedGifResult
						}
					}
				}
			}
		};
	});

	context('when given a command with the gif prefix', () => {
		let commandToTranslate;

		beforeEach(() => {
			commandToTranslate = chance.string();
			expectedCommand = `gif ${commandToTranslate}`;
			expectedGiphyEndpoint = `https://api.giphy.com/v1/gifs/translate?api_key=${expectedApiKey}&s=${commandToTranslate}`;

			sandbox.stub(axios, 'get')
				.withArgs(expectedGiphyEndpoint)
				.resolves(expectedGiphyResponse);
		});

		it('should return a translated gif', async () => {
			const result = await gif.processCommand(expectedCommand);

			expect(result).to.equal(expectedGifResult);
		});
	});

	context('when given a command with no prefix', () => {
		beforeEach(() => {
			expectedCommand = chance.string();
			expectedGiphyEndpoint = `https://api.giphy.com/v1/gifs/translate?api_key=${expectedApiKey}&s=${expectedCommand}`;

			sandbox.stub(axios, 'get')
				.withArgs(expectedGiphyEndpoint)
				.resolves(expectedGiphyResponse);
		});

		it('should return a translated gif', async () => {
			const result = await gif.processCommand(expectedCommand);

			expect(result).to.equal(expectedGifResult);
		});
	});
});
